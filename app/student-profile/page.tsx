// app/student-profile/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function StudentProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [major, setMajor] = useState("");
  const [year, setYear] = useState("");
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: "student",
          fullName,
          major,
          year,
          interests,
          skills,
          bio,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save profile");
      }

      // You now definitely have a row in data/students.json
      // Send them straight into Quick Match using their name
      router.push(
        `/quick-match?role=student&name=${encodeURIComponent(fullName)}`
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Something went wrong");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f2eaff] to-[#c8e7ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] bg-[#ff6ac8] text-[#241233] shadow-xl shadow-[#ff6ac8]/40 border border-[#ff9ddd] px-6 py-7 sm:px-8 sm:py-9 space-y-5"
        >
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Student profile
            </h1>
            <p className="text-sm text-[#3c214f]">
              Tell us about your background so we can match you with professors.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full name</label>
            <input
              className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2.5 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Major</label>
              <input
                className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Year</label>
              <input
                className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Interests</label>
            <input
              className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              placeholder="AI, robotics, biomechanics..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Skills</label>
            <input
              className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Python, SolidWorks, MATLAB..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio / notes</label>
            <textarea
              className="w-full min-h-[80px] rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93] resize-none"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share any constraints, goals, or lab preferences."
            />
          </div>

          {error && (
            <div className="rounded-[16px] bg-red-500/15 border border-red-400/60 px-4 py-2 text-xs text-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#004a93] text-white text-sm font-semibold py-3 shadow-lg shadow-[#004a93]/40 hover:brightness-110 disabled:opacity-70"
          >
            {isSubmitting ? "Saving & finding matches..." : "Save & find matches"}
          </button>
        </form>
      </div>
    </main>
  );
}
