import Link from "next/link";

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <section className="card p-8">
        <h1 className="text-3xl font-semibold">Create your account</h1>
        <p className="mt-2 text-[color:var(--muted)]">

        </p>

        <form className="mt-6 space-y-3">
          <input className="input" placeholder="Full name" />
          <input className="input" type="email" placeholder="you@school.edu" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn w-full" type="button">Sign up</button>
        </form>

        <p className="mt-4 text-sm text-[color:var(--muted)]">
          Already have an account? <Link href="/log-in" className="underline">Log in</Link>
        </p>
      </section>
    </main>
  );
}
