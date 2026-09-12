import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container-page text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-brand-900 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-brand-700">
          The page you&apos;re looking for may have moved. Try one of the links
          below, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <Link href="/batches" className="btn-outline">
            Explore Batches
          </Link>
        </div>
      </div>
    </section>
  );
}
