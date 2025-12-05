// app/api/quickmatch/route.ts
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export const runtime = "nodejs";

const DATA_DIR = path.join(process.cwd(), "data");
const STUDENTS_FILE = path.join(DATA_DIR, "students.json");
const PROFESSORS_FILE = path.join(DATA_DIR, "professors.json");

type Role = "student" | "professor";

interface BaseProfile {
  id: number;
  role: Role;
  fullName: string;
}

interface StudentProfile extends BaseProfile {
  role: "student";
  university?: string;
  fieldsOfInterest?: string[];
  skills?: string[];
  keywords?: string[];
  notes?: string;
}

interface ProfessorProfile extends BaseProfile {
  role: "professor";
  department?: string;
  researchArea?: string | string[];
  projects?: string | string[];
  keywords?: string[];
  bio?: string;
}

interface MatchResult<T extends BaseProfile> {
  profile: T;
  score: number;
}

async function readJson<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    if (!raw.trim()) return [];
    return JSON.parse(raw);
  } catch (err: any) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

// turn a student into a list of tags
function gatherStudentTags(s: StudentProfile): string[] {
  return [
    ...(s.fieldsOfInterest ?? []),
    ...(s.skills ?? []),
    ...(s.keywords ?? []),
  ];
}

// turn a professor into a list of tags
function gatherProfessorTags(p: ProfessorProfile): string[] {
  const researchArea = p.researchArea;
  const projects = p.projects;

  const areas = Array.isArray(researchArea)
    ? researchArea
    : researchArea
    ? [researchArea]
    : [];

  const projectTags = Array.isArray(projects)
    ? projects
    : projects
    ? [projects]
    : [];

  return [...areas, ...projectTags, ...(p.keywords ?? [])];
}

function scoreOverlap(a: string[], b: string[]): number {
  if (!a.length || !b.length) return 0;
  const setA = new Set(a.map((t) => t.toLowerCase()));
  let overlap = 0;
  for (const tag of b) {
    if (setA.has(tag.toLowerCase())) overlap++;
  }
  return overlap / Math.max(a.length, b.length);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const role = (url.searchParams.get("role") ?? "").toLowerCase() as Role;
  const name = (url.searchParams.get("name") ?? "").trim();

  if (!name) {
    return new NextResponse("Missing name", { status: 400 });
  }
  if (role !== "student" && role !== "professor") {
    return new NextResponse('role must be "student" or "professor"', {
      status: 400,
    });
  }

  const students = (await readJson<StudentProfile>(STUDENTS_FILE)).filter(
    (p) => p.role === "student"
  );
  const professors = (await readJson<ProfessorProfile>(PROFESSORS_FILE)).filter(
    (p) => p.role === "professor"
  );

  if (role === "student") {
    // seeker is a student, match against professors
    const seeker = students.find(
      (s) =>
        s.fullName.trim().toLowerCase() === name.toLowerCase()
    );

    if (!seeker) {
      return new NextResponse("No student profile found for that name.", {
        status: 404,
      });
    }

    const seekerTags = gatherStudentTags(seeker);
    const matches: MatchResult<ProfessorProfile>[] = professors.map((prof) => {
      const tags = gatherProfessorTags(prof);
      const score = scoreOverlap(seekerTags, tags);
      return { profile: prof, score };
    });

    matches.sort((a, b) => b.score - a.score);
    return NextResponse.json({ matches });
  } else {
    // role === "professor": seeker is professor, match against students
    const seeker = professors.find(
      (p) =>
        p.fullName.trim().toLowerCase() === name.toLowerCase()
    );

    if (!seeker) {
      return new NextResponse("No professor profile found for that name.", {
        status: 404,
      });
    }

    const seekerTags = gatherProfessorTags(seeker);
    const matches: MatchResult<StudentProfile>[] = students.map((stud) => {
      const tags = gatherStudentTags(stud);
      const score = scoreOverlap(seekerTags, tags);
      return { profile: stud, score };
    });

    matches.sort((a, b) => b.score - a.score);
    return NextResponse.json({ matches });
  }
}
