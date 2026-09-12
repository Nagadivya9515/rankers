import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import FacultyCard from "@/components/FacultyCard";
import BatchCard from "@/components/BatchCard";
import { getFaculty, getMentorshipPillars, getBatchesByCategory } from "@/lib/data";

export const metadata: Metadata = {
  title: "1:1 Mentorship Program",
  description:
    "RankersPro's 1:1 Mentorship pairs you directly with KP Sir, RP Sir, or Dr. Sandeep Sir — a personalized study planner, weekly review calls, error-notebook audits, and weak-area tracking for GATE, ESE, PSU and State AE/JE aspirants.",
};

const PILLAR_ICON: Record<string, string> = {
  calendar:
    "M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a2 2 0 012 2v13a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zM4 9v11h12V9H4z",
  phone:
    "M6.6 10.8c1.4 2.7 3.7 5 6.4 6.4l2.1-2.1a1 1 0 011-.25c1.1.4 2.3.6 3.5.6a1 1 0 011 1v3.4a1 1 0 01-1 1C10.7 21 3 13.3 3 3.9a1 1 0 011-1h3.4a1 1 0 011 1c0 1.2.2 2.4.6 3.5a1 1 0 01-.25 1z",
  notebook:
    "M6 2a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H6zm0 2h1v16H6V4zm3 0h9v16H9V4z",
  clock:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm1 5v5.4l4 2.3-.8 1.4-4.9-2.8V7h1.7z",
  target:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm0 3a7 7 0 110 14 7 7 0 010-14zm0 3a4 4 0 100 8 4 4 0 000-8zm0 3a1 1 0 110 2 1 1 0 010-2z",
  compass:
    "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5.5-5.5 2 2-5.5 5.5-2z",
};

export default function MentorshipPage() {
  const mentors = getFaculty();
  const pillars = getMentorshipPillars();
  const plans = getBatchesByCategory("Mentorship");

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="1:1 Mentorship"
            title="Learn from those who have conquered the exam"
            description="One-on-one guidance from KP Sir, RP Sir, and Dr. Sandeep Sir — a personalized study plan, weekly accountability, and the same error-tracking discipline that took RP Sir to GATE AIR 179."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#plans" className="btn-primary">
              View Mentorship Plans
            </a>
            <Link href="/about" className="btn-secondary">
              Talk to Us First
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section aria-labelledby="pillars-heading" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What You Get"
            title="Six pillars of individual guidance"
            as="h2"
            headingId="pillars-heading"
          />
          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.id} className="card-surface p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold-50">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-gold-600">
                    <path d={PILLAR_ICON[pillar.icon] ?? PILLAR_ICON.target} />
                  </svg>
                </div>
                <h3 className="mt-4 text-base font-extrabold text-brand-900">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor roster */}
      <section aria-labelledby="mentors-heading" className="bg-brand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Your Mentors"
            title="Three mentors, one 1:1 track"
            as="h2"
            headingId="mentors-heading"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {mentors.map((mentor) => (
              <FacultyCard key={mentor.id} faculty={mentor} variant="compact" />
            ))}
          </div>
        </div>
      </section>

      {/* Plans — reads data/batches.json's "Mentorship" category live */}
      <section id="plans" aria-labelledby="plans-heading" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="Pricing"
            title="Choose your mentorship term"
            as="h2"
            headingId="plans-heading"
          />
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {plans.map((plan) => (
              <BatchCard key={plan.id} batch={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-gradient py-16 text-center sm:py-20">
        <div className="container-page mx-auto max-w-2xl">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Your rank has a name. Let&apos;s make it yours.
          </h2>
          <p className="mt-4 text-brand-100">
            Seats are tracked individually per mentor — start now or talk to the partnership
            desk first.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="#plans" className="btn-primary">
              View Plans
            </a>
            <a href="tel:+918985931112" className="btn-secondary">
              Call the Partnership Desk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
