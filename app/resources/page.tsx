import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { PlaceholderVideoBox } from "@/components/PlaceholderMedia";
import { getResources } from "@/lib/data";

export const metadata: Metadata = {
  title: "Free Resources & Mentorship",
  description:
    "Free GATE Civil Engineering videos and career-guidance content, plus 'How RP Sir Cracked GATE with AIR 179' — RankersPro's real self-study blueprint.",
};

export default function ResourcesPage() {
  const resources = getResources();
  const videos = resources.filter((r) => r.type === "video");
  const article = resources.find((r) => r.type === "article");

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="Free Resources"
            title="Study material, on the house"
            description="Free videos and career guidance from our faculty team — no login, no batch purchase required."
          />
        </div>
      </section>

      {/* Video grid */}
      <section aria-labelledby="videos-heading" className="py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Watch" title="Free Video Lessons" as="h2" headingId="videos-heading" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-brand-100 bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <PlaceholderVideoBox
                  alt={`Video thumbnail for RankersPro free lesson: ${video.title}`}
                  title={video.title}
                  duration={video.meta}
                />
                <h3 className="mt-3 text-sm font-bold leading-snug text-brand-900 group-hover:text-gold-600">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-brand-600">
                  {video.description}
                </p>
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-brand-600">
            More free lessons on our{" "}
            <a
              href="https://www.youtube.com/@RankersPro"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gold-600 underline"
            >
              YouTube channel
            </a>
            .
          </p>
        </div>
      </section>

      {/* Article: How RP Sir Cracked GATE with AIR 179 */}
      {article && (
        <section aria-labelledby="article-heading" className="bg-brand-50 py-16 sm:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-3xl rounded-2xl border border-brand-100 bg-white p-8 shadow-card sm:p-10">
              <p className="eyebrow">Long-Form Read · {article.meta}</p>
              <h2 id="article-heading" className="mt-2 text-2xl font-extrabold text-brand-900 sm:text-3xl">
                {article.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-700">{article.description}</p>

              <div className="prose-article mt-6 space-y-5 text-base leading-relaxed text-brand-700">
                <p>
                  RankersPro&apos;s Rajendra Prasad (RP Sir) secured <strong>All India Rank 179 in
                  GATE</strong> through pure self-study — no coaching-driven shortcuts, just a
                  disciplined daily system. Here&apos;s the exact routine, revision framework, and
                  exam strategy he shared, broken down for aspirants building their own GATE
                  plan.
                </p>

                <div>
                  <h3 className="text-lg font-extrabold text-brand-900">
                    1. The &ldquo;Day in the Life&rdquo; — RP Sir&apos;s Daily Schedule
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {[
                      "4:00 AM wake-up (a consistent 5:00–6:00 AM works too, if held every day)",
                      "~10 minutes of exercise, followed by a 2–2.5 km jog",
                      "5:30–6:30 AM: revising the previous day's topics before class, so every new lecture built on a “warm” foundation",
                      "6:00 AM onward: commute and coaching classes, running from roughly 6:30 AM",
                      "Daytime: B.Tech college classes and labs continued alongside GATE coaching — tight scheduling, not full-time prep",
                      "Evenings: revising the day's lessons and solving practice problems",
                      "Weekends: cumulative revision across all topics, plus subject-wise tests",
                      "Core rule: avoid late-night study — an early, consistent wake-up beats a late-night grind over months of prep",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm sm:text-base">
                        <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 fill-gold-500">
                          <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-brand-900">
                    2. The Core Learning Cycle — Mastering Any Chapter
                  </h3>
                  <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm sm:text-base">
                    <li>Full-length class notes, captured as taught with no shortcuts</li>
                    <li>Concept revision — re-working the notes to lock in understanding</li>
                    <li>Short notes — condensed formulas and exam triggers</li>
                    <li>Class practice questions to test applied understanding</li>
                    <li>Previous year questions (PYQs), topic-wise</li>
                    <li>A topic-specific test, with every mistake logged in an error (&ldquo;lag&rdquo;) notebook for weekend revision</li>
                  </ol>

                  <div className="mt-5 overflow-x-auto rounded-lg border border-brand-100">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-brand-50 text-brand-900">
                        <tr>
                          <th className="px-4 py-2.5 font-bold">Subject Priority</th>
                          <th className="px-4 py-2.5 font-bold">Minimum Revision Count</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-100">
                        <tr>
                          <td className="px-4 py-2.5">Highly important subjects (high GATE weightage)</td>
                          <td className="px-4 py-2.5 font-semibold">3–5 times minimum</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5">All other subjects</td>
                          <td className="px-4 py-2.5 font-semibold">At least 2 times</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-brand-900">
                    3. Tools & Tactics Today&apos;s Aspirants Have
                  </h3>
                  <p className="mt-3 text-sm sm:text-base">
                    RP Sir is candid that today&apos;s students hold a structural edge he had to
                    build from scratch: dedicated PYQ books organized by topic, ready-made
                    structured test series, and study material pre-sorted by topic. His direct
                    takeaway — solving each important subject&apos;s PYQs 3–5 times with today&apos;s
                    resources should put a disciplined student in single/double-digit rank
                    territory, beating his own AIR 179.
                  </p>
                  <p className="mt-3 text-sm sm:text-base">
                    <strong>The &ldquo;2x Rule&rdquo; for test analysis:</strong> analysis time
                    should be double the time taken to attempt the test itself. A rushed
                    five-minute review of a three-hour test isn&apos;t real analysis.
                  </p>
                  <p className="mt-3 text-sm sm:text-base">
                    <strong>Exam-day sequence:</strong> easy questions first to bank guaranteed
                    marks, moderate-difficulty questions second, and difficult questions last —
                    only after the easier marks are secured.
                  </p>
                </div>

                <p className="text-sm italic text-brand-500">
                  Strategy shared by Rajendra Prasad (RP Sir), RankersPro. Batch names and dates
                  referenced in the original session are pending confirmation before republishing
                  as live offers — see the current{" "}
                  <Link href="/batches" className="font-semibold text-gold-600 underline">
                    Batches page
                  </Link>{" "}
                  for active enrollment.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mentorship teaser */}
      <section aria-labelledby="mentorship-teaser-heading" className="bg-brand-gradient py-16 sm:py-20">
        <div className="container-page mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-400">1:1 Mentorship</p>
          <h2 id="mentorship-teaser-heading" className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Want a study plan built around you?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-100 sm:text-lg">
            RankersPro&apos;s 1:1 Mentorship Plan pairs you directly with a faculty mentor —
            personalized planning, weekly review calls, and the same error-notebook discipline
            behind RP Sir&apos;s own AIR 179.
          </p>
          <Link href="/mentorship" className="btn-primary mt-8">
            Explore Mentorship
          </Link>
        </div>
      </section>
    </>
  );
}
