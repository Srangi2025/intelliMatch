import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-14">
      {/* LEFT: Hero */}
      <section className="flex-1 space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--rm-border)] bg-white/5 px-3 py-1 text-xs font-medium text-[var(--rm-gray)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--rm-pink)]" />
          Matching students and real research professionals
        </span>

        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Find research that{" "}
          <span className="bg-gradient-to-r from-[var(--rm-pink)] to-[var(--rm-pink-soft)] bg-clip-text text-transparent">
            actually fits
          </span>{" "}
          YOU
        </h1>

        <p className="max-w-xl text-sm text-[var(--rm-gray)] sm:text-base">
          intelliMatch connects students with professors based on
          skills, interests, and availability. No more cold emailing and waiting for replies. 
        </p>


<div className="flex flex-wrap gap-3">
  {/* Main CTA – default to student flow */}
  <Link
    href="/student-profile"
    className="rounded-full bg-[var(--rm-pink)] px-5 py-2 text-sm font-medium text-black shadow-lg shadow-pink-500/30 hover:brightness-110"
  >
    Get started in as little as 3 minutes
  </Link>

  {/* QUICK MATCH – NEW DESTINATION */}
  <Link
    href="/quick-match"
    className="rounded-full border border-[var(--rm-pink)] bg-transparent px-5 py-2 text-sm font-medium text-[var(--rm-pink)] hover:bg-[var(--rm-pink)]/10"
  >
    Try a quick match
  </Link>

  {/* Join Beta */}
  <Link
    href="https://forms.gle/V5YJ4upqJZzw64Xu9"
    target="_blank"
    rel="noopener noreferrer"
    className="rounded-full bg-[var(--rm-pink)] px-5 py-2 text-sm font-medium text-black shadow-lg shadow-pink-500/30 hover:brightness-110"
  >
    Join Beta
  </Link>
</div>

      </section>

      {/* RIGHT: Role cards */}
      <section className="flex-1 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {/* Student card */}
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-5 shadow-lg shadow-black/40">
            <div className="mb-3 inline-flex items-center rounded-full bg-pink-500/10 px-2 py-1 text-xs font-medium text-[var(--rm-pink)]">
              Student
            </div>
            <h2 className="text-lg font-semibold">Find your first research oppurtunity</h2>
            <p className="mt-1 text-xs text-[var(--rm-gray)]">
              Share your major, skills, and interests. Professors match with you!
            </p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--rm-gray)]">
              <li>• Filter multiple things</li>
              <li>• Highlight projects and work</li>
              <li>• Get matches instead of mass-emails</li>
            </ul>
            <Link
              href="/student-profile"
              className="mt-4 inline-flex items-center text-sm font-medium text-[var(--rm-pink)] hover:underline"
            >
              Create student profile
            </Link>
          </div>

          {/* Professor card */}
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-5 shadow-lg shadow-black/40">
            <div className="mb-3 inline-flex items-center rounded-full bg-pink-500/10 px-2 py-1 text-xs font-medium text-[var(--rm-pink)]">
              Professor
            </div>
            <h2 className="text-lg font-semibold">Find driven undergrads faster</h2>
            <p className="mt-1 text-xs text-[var(--rm-gray)]">
              Publish a profile and specify required skills. Find students who fit your mission. 
            </p>
            <ul className="mt-3 space-y-1 text-xs text-[var(--rm-gray)]">
              <li>• Tag your projects</li>
              <li>• Indicate time schedules</li>
              <li>• Review candidates based on scores</li>
            </ul>
            <Link
              href="/professor-profile"
              className="mt-4 inline-flex items-center text-sm font-medium text-[var(--rm-pink)] hover:underline"
            >
              Create professor profile
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}
