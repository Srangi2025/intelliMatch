"use client";

import { useState, FormEvent } from "react";

interface MatchProfile {
  id?: number;
  name?: string;
  department?: string;
  major?: string;
  researchAreas?: string[];
  interests?: string[];
  requiredSkills?: string[];
  skills?: string[];
}

interface MatchResult {
  profile: MatchProfile;
  score: number;
}

export default function QuickMatchPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "professor">("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  setIsLoading(true);
  setError(null);
  setMatches([]);
  setHasSearched(true);

  try {
    const res = await fetch(
      `/api/quickmatch?role=${encodeURIComponent(
        role
      )}&name=${encodeURIComponent(name.trim())}`
    );

    if (!res.ok) {
      const msg = await res.text();
      setError(msg || `Quickmatch failed with status ${res.status}`);
      setIsLoading(false);
      return; // ⬅️ don't try to parse JSON
    }

    const data = await res.json();
    setMatches(data.matches ?? data);
  } catch (err: any) {
    console.error(err);
    setError(err.message ?? "Something went wrong");
  } finally {
    setIsLoading(false);
  }
}


  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-[#f2eaff] to-[#c8e7ff] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl space-y-6">
        {/* Pink Card – Quick Match Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-[32px] bg-[#ff6ac8] text-[#241233] shadow-xl shadow-[#ff6ac8]/40 border border-[#ff9ddd] px-6 py-7 sm:px-8 sm:py-9 space-y-5"
        >
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Quick Research Match
            </h1>
            <p className="text-sm text-[#3c214f]">
              Test the  engine using an existing saved profile. Enter
              the name you used when you created your profile and your role.
            </p>
          </div>

          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Name on your profile</label>
            <input
              className="w-full rounded-[18px] bg-[#ff8ad6] border border-[#ffb0e4] px-4 py-2.5 text-sm placeholder:text-[#5b2e73] focus:outline-none focus:ring-2 focus:ring-[#004a93]"
              placeholder="Sai Rangi, etc."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Role select */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Role</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`flex-1 rounded-[18px] px-4 py-2 text-sm font-medium border transition ${
                  role === "student"
                    ? "bg-[#004a93] text-white border-[#004a93]"
                    : "bg-[#ff8ad6] text-[#2d1740] border-[#ffb0e4] hover:bg-[#ff9ddd]"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("professor")}
                className={`flex-1 rounded-[18px] px-4 py-2 text-sm font-medium border transition ${
                  role === "professor"
                    ? "bg-[#004a93] text-white border-[#004a93]"
                    : "bg-[#ff8ad6] text-[#2d1740] border-[#ffb0e4] hover:bg-[#ff9ddd]"
                }`}
              >
                Professor
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            className="w-full rounded-full bg-[#004a93] text-white text-sm font-semibold py-3 shadow-lg shadow-[#004a93]/40 hover:brightness-110 disabled:opacity-70"
          >
            {isLoading ? "Finding matches..." : "Find matches"}
          </button>
        </form>

        {/* Results / error / empty state */}
        {isLoading && (
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-5 text-sm text-[var(--rm-gray)]">
            Calculating your matches…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 p-5 text-sm text-red-200">
            {error}
          </div>
        )}

        {!isLoading && !error && hasSearched && matches.length === 0 && (
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-5 text-sm text-[var(--rm-gray)]">
            No saved profile was found for that name and role, or there were no
            strong matches yet. Check the spelling of your name or create a
            profile first.
          </div>
        )}

        {!isLoading && !error && matches.length > 0 && (
          <section className="space-y-3">
            <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--rm-gray)]">
                  Match results
                </p>
                <h2 className="text-xl font-semibold">
                  Openings for {name} ({role}) researcher
                </h2>
              </div>
            </header>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((m, index) => {
                const p = m.profile ?? {};
                const scorePercent = Math.round((m.score ?? 0) * 100);

                const tags = [
                  ...(p.researchAreas ?? []),
                  ...(p.interests ?? []),
                  ...(p.requiredSkills ?? []),
                  ...(p.skills ?? []),
                ].slice(0, 6);

                return (
                  <article
                    key={p.id ?? index}
                    className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-4 flex flex-col gap-3 hover:border-[var(--rm-pink)] hover:bg-[var(--rm-bg-soft)] transition"
                  >
                    <header className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold leading-snug">
                          {p.name ?? "Unnamed profile"}
                        </h3>
                        <p className="text-xs text-[var(--rm-gray)]">
                          {p.department || p.major || "Research profile"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--rm-gray)]">
                          Match
                        </p>
                        <p className="text-lg font-semibold text-[var(--rm-pink)]">
                          {scorePercent}%
                        </p>
                      </div>
                    </header>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, i) => (
                          <span
                            key={i}
                            className="rounded-full border border-[var(--rm-border)] bg-black/40 px-2 py-0.5 text-[11px] text-[var(--rm-gray)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <footer className="mt-auto pt-1 text-[11px] text-[var(--rm-gray)]">
                      Ranked #{index + 1} overall
                    </footer>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
