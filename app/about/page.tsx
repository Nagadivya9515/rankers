import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StatBar from "@/components/StatBar";
import { getFaculty } from "@/lib/data";
import { InitialsAvatar } from "@/components/PlaceholderMedia";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "RankersPro is a Civil Engineering-focused coaching platform built around three master mentors, with 22+ years of combined experience and a track record of GATE, ESE and PSU selections.",
};

const VALUES = [
  {
    title: "Faculty who've cleared the exam",
    description:
      "Every mentor at RankersPro has themselves cracked GATE, ESE, or an equivalent recruitment exam — teaching isn't theoretical for us, it's a replayed playbook.",
  },
  {
    title: "Depth over breadth",
    description:
      "We focus deliberately on Civil Engineering and its allied recruitment exams, rather than spreading thin across every branch — so every batch gets full faculty attention.",
  },
  {
    title: "Numbers we can prove",
    description:
      "Every statistic we publish — years of experience, students mentored, ranks achieved — is verified before it goes on this site, and updated as new results come in.",
  },
];

export default function AboutPage() {
  const faculty = getFaculty();

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="About RankersPro"
            title="Built by mentors who've been where you're going"
            description="RankersPro exists for one reason: to take Civil Engineering aspirants from where they are to a rank they can be proud of — using the same methods our own faculty used to clear GATE, ESE, and state recruitment exams."
          />
        </div>
      </section>

      <StatBar />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Our Story" title="Why RankersPro exists" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-700">
              <p>
                RankersPro was built around a simple observation: the aspirants who
                clear GATE, ESE, and state engineering exams at the top of the list
                are almost always the ones taught by people who have cleared those
                exams themselves.
              </p>
              <p>
                So instead of building a large, generalist faculty roster, we
                brought together three master mentors — each a specialist in a
                distinct part of the Civil Engineering syllabus — and gave them the
                room to teach the way they wish they&apos;d been taught.
              </p>
              <p>
                Today, that team has mentored over 1,00,000 students, trained a
                GATE All India Rank 1, and put students into IITs, IISc, PSUs, and
                state engineering services year after year.
              </p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {faculty.map((member) => (
              <Link
                key={member.id}
                href="/faculty"
                className="flex items-center gap-4 rounded-xl border border-brand-100 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <InitialsAvatar
                  initials={member.initials}
                  alt={member.photoAlt}
                  size="sm"
                  palette="brand"
                />
                <div>
                  <p className="text-sm font-bold text-brand-900">{member.shortName}</p>
                  <p className="text-xs text-brand-600">{member.subject}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-50 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="What We Stand For"
            title="How we run RankersPro"
          />
          <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-brand-100 bg-white p-6 shadow-card"
              >
                <h3 className="text-lg font-extrabold text-brand-900">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-700">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center sm:py-20">
        <div className="container-page">
          <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
            Ready to see the batches?
          </h2>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/batches" className="btn-primary">
              Explore Batches
            </Link>
            <Link href="/faculty" className="btn-outline">
              Meet Our Faculty
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
