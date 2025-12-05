// lib/profilesDb.ts
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const STUDENTS_FILE = path.join(DATA_DIR, "students.json");
const PROFESSORS_FILE = path.join(DATA_DIR, "professors.json");

export type Role = "student" | "professor";

export type Profile = {
  id: number;
  role: Role;
  createdAt: string;
  fullName: string;
  major?: string;
  year?: string;
  skillset?: string;
  research?: string;
  projects?: string;
  gpa?: string;
  coursework?: string;
  resumePath?: string;
  department?: string;
  researchArea?: string;
  labWebsite?: string;
  bio?: string;
};

/**
 * Pick the right JSON file based on role.
 */
function fileForRole(role: Role): string {
  return role === "student" ? STUDENTS_FILE : PROFESSORS_FILE;
}

/**
 * Make sure the file + directory exist.
 */
function ensureFile(filePath: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
}

/**
 * Read all profiles for a given role.
 */
export function readProfiles(role: Role): Profile[] {
  const filePath = fileForRole(role);
  ensureFile(filePath);
  const raw = fs.readFileSync(filePath, "utf8");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Profile[]) : [];
  } catch {
    return [];
  }
}

/**
 * Optionally: read everything from both files at once.
 */
export function readAllProfiles(): { students: Profile[]; professors: Profile[] } {
  const students = readProfiles("student");
  const professors = readProfiles("professor");
  return { students, professors };
}

/**
 * Add a profile to the appropriate file based on its role.
 */
export function addProfile(
  profile: Omit<Profile, "id" | "createdAt">
): Profile {
  const filePath = fileForRole(profile.role);
  const profiles = readProfiles(profile.role);

  const newProfile: Profile = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    ...profile,
  };

  profiles.push(newProfile);
  fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));

  return newProfile;
}
