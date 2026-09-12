import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBatches, getBatchBySlug, getFacultyById } from "@/lib/data";
import { formatINR, discountPercent } from "@/lib/format";
import { InitialsAvatar, PlaceholderCardArt } from "@/components/PlaceholderMedia";

interface BatchDetailPageProps {
  params: { slug: string };
}

// Pre-render every batch detail page at build time (static export).
export function generateStaticParams() {
  return getBatches().map((batch) => ({ slug: batch.slug }));
}

export function generateMetadata({ params }: BatchDetailPageProps): Metadata {
  const batch = getBatchBySlug(params.slug);
  if (!batch) return { title: "Batch Not Found" };

  return {
    title: batch.name,
    description: batch.summary,
    openGraph: {
      title: `${batch.name} | RankersPro`,
      description: batch.summary,
    },
  };
}

const CATEGORY_ICON = {
  "GATE & ESE": "book",
  "APPSC/TGPSC": "cap",
  "SSC JE": "flag",
  "RRB JE": "train",
  "State AE/JE": "map",
  Mentorship: "users",
  "Career Guidance": "compass",
} as const;

export default function BatchDetailPage({ params }: BatchDetailPageProps) {
  const batch = getBatchBySlug(params.slug);
  if (!batch) notFound();

  const percentOff = discountPercent(batch.price, batch.discountPrice);
  const facultyMembers = batch.faculty
    .map((id) => getFacultyById(id))
    .filter((member): member is NonNullable<typeof member> => Boolean(member));

  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-brand-100 bg-cream">
        <div className="container-page py-3 text-sm text-brand-600">
          <Link href="/batches" className="hover:text-brand-800">
            Batches
          </Link>
          <span aria-hidden="true" className="mx-2">
            /
          </span>
          <span className="font-semibold text-brand-800">{batch.name}</span>
        </div>
      </nav>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <PlaceholderCardArt
              alt={batch.imageAlt}
              label={batch.category}
              icon={CATEGORY_ICON[batch.category]}
              className="rounded-xl"
              imageSrc={batch.imageSrc}
            />

            <p className="eyebrow mt-6">{batch.category}</p>
            <h1 className="mt-1.5 text-3xl font-extrabold text-brand-900 sm:text-4xl">
              {batch.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-brand-700">{batch.summary}</p>

            <div className="mt-8 space-y-4">
              {batch.description.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed text-brand-700">
                  {paragraph}
                </p>
              ))}
            </div>

            {batch.coverage && batch.coverage.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-extrabold text-brand-900">What&apos;s Covered</h2>
                <ul className="mt-4 space-y-2.5">
                  {batch.coverage.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-brand-800 sm:text-base">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-5 w-5 shrink-0 fill-gold-500"
                      >
                        <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {facultyMembers.length > 0 && (
              <div className="mt-10">
                <h2 className="text-lg font-extrabold text-brand-900">Taught By</h2>
                <div className="mt-4 flex flex-wrap gap-4">
                  {facultyMembers.map((member) => (
                    <Link
                      key={member.id}
                      href="/faculty"
                      className="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-3 pr-5 shadow-card hover:shadow-card-hover"
                    >
                      <InitialsAvatar
                        initials={member.initials}
                        alt={member.photoAlt}
                        size="sm"
                        palette="brand"
                        photoSrc={member.photoSrc}
                      />
                      <div>
                        <p className="text-sm font-bold text-brand-900">{member.shortName}</p>
                        <p className="text-xs text-brand-600">{member.subject}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky pricing / CTA panel */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl border-2 border-gold-200 bg-white p-6 shadow-card sm:p-8">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
                  {formatINR(batch.discountPrice)}
                </span>
                {batch.price !== null && (
                  <span className="text-lg text-brand-400 line-through">
                    {formatINR(batch.price)}
                  </span>
                )}
              </div>
              {percentOff > 0 && (
                <p className="mt-1 text-sm font-bold text-gold-700">
                  Save {percentOff}% — limited-time pricing
                </p>
              )}

              <dl className="mt-6 space-y-3 border-y border-brand-100 py-5 text-sm">
                {batch.duration && (
                  <div className="flex justify-between">
                    <dt className="text-brand-600">Duration / Eligibility</dt>
                    <dd className="text-right font-semibold text-brand-900">{batch.duration}</dd>
                  </div>
                )}
                {batch.mode && (
                  <div className="flex justify-between">
                    <dt className="text-brand-600">Mode</dt>
                    <dd className="text-right font-semibold text-brand-900">{batch.mode}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-brand-600">Category</dt>
                  <dd className="font-semibold text-brand-900">{batch.category}</dd>
                </div>
              </dl>

              {batch.highlights && batch.highlights.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {batch.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-sm text-brand-800">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        className="mt-0.5 h-4 w-4 shrink-0 fill-brand-500"
                      >
                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.7 6.7l-4.5 4.5a1 1 0 01-1.4 0L5.3 10.7a1 1 0 111.4-1.4l1.8 1.8 3.8-3.8a1 1 0 111.4 1.4z" />
                      </svg>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}

              <a
                href={batch.appxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 w-full !py-4 text-base shadow-card-hover hover:!shadow-floating hover:scale-[1.015]"
                aria-label={`Buy ${batch.name} now on AppX — opens in a new tab`}
              >
                Buy Now on AppX
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                  <path d="M12.3 3.3a1 1 0 011.4 0l4 4a1 1 0 010 1.4l-4 4a1 1 0 01-1.4-1.4L14.6 9H4a1 1 0 010-2h10.6l-2.3-2.3a1 1 0 010-1.4z" />
                </svg>
              </a>
              <p className="mt-3 text-center text-xs text-brand-500">
                Secure checkout via AppX / Razorpay. You&apos;ll leave rankerspro.com to complete
                payment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
