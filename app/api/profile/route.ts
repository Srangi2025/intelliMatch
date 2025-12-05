import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type Role = "student" | "professor";

type Profile = {
  id: string;
  role: Role;
  fullName: string;
  major: string;
  year: string;
  interests: string;
  skills: string;
  bio: string;
};

// 🔹 Put JSON files under /data so they match QuickMatch
const DATA_DIR = path.join(process.cwd(), "data");
const studentsPath = path.join(DATA_DIR, "students.json");
const professorsPath = path.join(DATA_DIR, "professors.json");

// Generic helpers for any path
function ensureFile(filePath: string) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
}

function readProfiles(filePath: string): Profile[] {
  try {
    ensureFile(filePath);
    const data = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Error reading profiles:", err);
    return [];
  }
}

function writeProfiles(filePath: string, profiles: Profile[]) {
  try {
    ensureFile(filePath);
    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));
  } catch (err) {
    console.error("Error writing profiles:", err);
  }
}

// GET /api/profile
// - /api/profile?role=student    -> students.json
// - /api/profile?role=professor  -> professors.json
// - /api/profile                 -> { students, professors }
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const roleParam = url.searchParams.get("role") as Role | null;

  if (roleParam === "student") {
    const students = readProfiles(studentsPath);
    return NextResponse.json(students);
  }

  if (roleParam === "professor") {
    const professors = readProfiles(professorsPath);
    return NextResponse.json(professors);
  }

  const students = readProfiles(studentsPath);
  const professors = readProfiles(professorsPath);
  return NextResponse.json({ students, professors });
}

// POST /api/profile -> append a new profile to the correct file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const role: Role = body.role === "professor" ? "professor" : "student";

    const newProfile: Profile = {
      id: Date.now().toString(),
      role,
      fullName: body.fullName || "",
      major: body.major || "",
      year: body.year || "",
      interests: body.interests || "",
      skills: body.skills || "",
      bio: body.bio || "",
    };

    // 🔹 Choose file based on role
    const filePath = role === "student" ? studentsPath : professorsPath;

    const profiles = readProfiles(filePath);
    profiles.push(newProfile);
    writeProfiles(filePath, profiles);

    return NextResponse.json({ success: true, profile: newProfile });
  } catch (err) {
    console.error("Error in POST /api/profile:", err);
    return NextResponse.json(
      { error: "Failed to save profile" },
      { status: 500 }
    );
  }
}
