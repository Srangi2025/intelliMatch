
import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "intelliMatch",
  description: "Connecting students with professors for research opportunities.",
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--rm-bg)] text-[var(--rm-white)]">
        <div className="relative min-h-screen">
          {/* subtle overlay grid */}
          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_1px_1px,#1f2937_1px,transparent_0)] bg-[length:24px_24px]" />

          <div className="relative z-10 flex min-h-screen flex-col">
            {/* NAVBAR */}
            <header className="border-b border-[var(--rm-border)] bg-black/40 backdrop-blur">
              <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--rm-pink)] to-[var(--rm-pink-soft)] text-sm font-semibold shadow-lg">
                    iM
                  </div>
                  <span className="text-lg font-semibold tracking-tight">
  intelliMatch
</span>

                </Link>

                <div className="flex items-center gap-4 text-sm">
                  <Link
                    href="/get-started"
                    className="text-[var(--rm-gray)] hover:text-[var(--rm-white)]"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/log-in"
                    className="text-[var(--rm-gray)] hover:text-[var(--rm-white)]"
                  >
                    Log In
                  </Link>
                  <Link
  href="https://forms.gle/jTBkPpNSN7YT2hoLA"
  target="_blank"
  rel="noopener noreferrer"
  className="px-4 py-2 rounded-lg bg-pink-500 hover:bg-pink-600 text-white font-medium transition"
>
  Join Beta
</Link>
                </div>
              </nav>
            </header>

            
            <main className="flex-1">
              <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
            </main>

            
            <footer className="border-t border-[var(--rm-border)] bg-black/40">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-[var(--rm-gray)]">
                <span>© {new Date().getFullYear()} Intellimatch</span>
                <span>Built for Students in STEM Research</span>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
