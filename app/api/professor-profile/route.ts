import { NextRequest, NextResponse } from "next/server";
import { addProfile } from "../../../lib/profilesDb";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const fullName = String(formData.get("fullName") || "");
  const department = String(formData.get("department") || "");
  const researchArea = String(formData.get("researchArea") || "");
  const labWebsite = String(formData.get("labWebsite") || "");
  const projects = String(formData.get("projects") || "");
  const bio = String(formData.get("bio") || "");

  addProfile({
    role: "professor",
    fullName,
    department,
    researchArea,
    labWebsite,
    projects,
    bio,
  });

  return NextResponse.redirect(new URL("/get-started", request.url));
}
