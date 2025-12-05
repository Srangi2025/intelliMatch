// app/test/page.tsx
"use client";

import { useEffect, useState } from "react";

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
  score: number; // assume 0–1 from your matching function
}

export default function TestPage() {
  // For now: simple demo values
  const role: "student" | "professor" = "student";
  const seekerId = 1;

  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`/api/match?role=${role}&seekerId=${seekerId}`);

        if (!res.ok) {
          throw new Error(`Match API failed with status ${res.status}`);
        }

        const data = await res.json();

        // If your API returns just an array, change this line to setMatches(data)
        setMatches(data.matches ?? data);
      } catch (err: any) {
        console.error(err);
        setError(err.message ?? "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatches();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--rm-bg)] text-white px-4 py-10 flex justify-center">
      <div className="w-full max-w-5xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--rm-gray)]">
              Match results
            </p>
            <h1 className="text-3xl font-semibold">
              Top professor matches for you
            </h1>
            <p className="mt-1 text-xs text-[var(--rm-gray)]">
              Based on your skills, interests, and availability.
            </p>
          </div>

          <div className="text-xs text-[var(--rm-gray)]">
            Role: <span className="font-mono">{role}</span>
            <br />
            Seeker ID: <span className="font-mono">{seekerId}</span>
          </div>
        </header>

        {/* States */}
        {isLoading && (
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-6 text-sm text-[var(--rm-gray)]">
            Calculating your matches…
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/60 bg-red-500/10 p-6 text-sm text-red-200">
            Error: {error}
          </div>
        )}

        {!isLoading && !error && matches.length === 0 && (
          <div className="rounded-2xl border border-[var(--rm-border)] bg-[var(--rm-bg-soft)]/90 p-6 text-sm text-[var(--rm-gray)]">
            No matches found yet. Try adjusting your profile or adding more
            interests/skills.
          </div>
        )}

        {/* Match cards */}
        {!isLoading && !error && matches.length > 0 && (
          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      <h2 className="text-base font-semibold leading-snug">
                        {p.name ?? "Unnamed profile"}
                      </h2>
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

                  <footer className="mt-auto pt-2 text-[11px] text-[var(--rm-gray)]">
                    Ranked #{index + 1} overall
                  </footer>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </main>
  );
}
