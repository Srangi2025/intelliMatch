import Link from "next/link";

export default function LogInPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-[color:var(--muted)]">
          Log in to continue finding great research matches.
        </p>

        <form className="mt-6 space-y-3">
          <input className="input" type="email" placeholder="you@school.edu" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn w-full" type="button">Log in</button>
        </form>

        <p className="mt-4 text-sm text-[color:var(--muted)]">
          New here? <Link href="/sign-in" className="underline">Create an account</Link>
        </p>
      </section>
    </main>
  );
}
