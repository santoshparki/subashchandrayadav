import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 text-white">
      <section className="max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-display text-5xl font-semibold sm:text-6xl">Page not found.</h1>
        <p className="mt-4 text-sm leading-7 text-white/60">
          The page you are looking for is not available.
        </p>
        <Link href="/" className="button-light mt-8">
          Return home
        </Link>
      </section>
    </main>
  );
}
