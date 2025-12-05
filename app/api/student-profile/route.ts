import { NextRequest, NextResponse } from "next/server";
import { addProfile } from "../../../lib/profilesDb";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const fullName = String(formData.get("fullName") || "");
  const major = String(formData.get("major") || "");
  const year = String(formData.get("year") || "");
  const skillset = String(formData.get("skillset") || "");
  const research = String(formData.get("research") || "");
  const projects = String(formData.get("projects") || "");
  const gpa = String(formData.get("gpa") || "");
  const coursework = String(formData.get("coursework") || "");

  addProfile({
    role: "student",
    fullName,
    major,
    year,
    skillset,
    research,
    projects,
    gpa,
    coursework,
  });

  return NextResponse.redirect(new URL("/get-started", request.url));
}
