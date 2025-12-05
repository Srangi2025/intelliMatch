// app/api/match/route.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Use Node runtime so fs/path are allowed
export const runtime = "nodejs";

type StudentProfile = {
  id: number;
  name: string;
  major: string;
  year: string;
  interests: string[];
  skills: string[];
  availabilityHoursPerWeek: number;
};

type ProfessorProfile = {
  id: number;
  name: string;
  department: string;
  labName: string;
  researchAreas: string[];
  requiredSkills: string[];
  minHoursPerWeek: number;
};

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(fileName: string): T {
  const filePath = path.join(DATA_DIR, fileName);
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw) as T;
}

/**
 * GET /api/match?role=student&seekerId=1
 * This is just for easy testing in the browser.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const role = (url.searchParams.get("role") || "student") as
      | "student"
      | "professor";

    const seekerIdParam = url.searchParams.get("seekerId");
    const seekerName = url.searchParams.get("name");

    const students = readJson<StudentProfile[]>("students.json");
    const professors = readJson<ProfessorProfile[]>("professors.json");

    if (role === "student") {
      let seeker: StudentProfile | undefined;

      if (seekerName) {
        seeker = students.find(
          (s) => s.name.toLowerCase() === seekerName.toLowerCase()
        );
      } else if (seekerIdParam) {
        const seekerId = Number(seekerIdParam);
        seeker = students.find((s) => s.id === seekerId);
      }

      if (!seeker) seeker = students[0]; // fallback so it always returns something

      const matches = professors.slice(0, 5);
      return NextResponse.json({ seeker, matches });
    }

    if (role === "professor") {
      let seeker: ProfessorProfile | undefined;

      if (seekerName) {
        seeker = professors.find(
          (p) => p.name.toLowerCase() === seekerName.toLowerCase()
        );
      } else if (seekerIdParam) {
        const seekerId = Number(seekerIdParam);
        seeker = professors.find((p) => p.id === seekerId);
      }

      if (!seeker) seeker = professors[0];

      const matches = students.slice(0, 5);
      return NextResponse.json({ seeker, matches });
    }

    return NextResponse.json({ error: "Invalid role" }, { status: 400 });
  } catch (err) {
    console.error("Error in GET /api/match:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
