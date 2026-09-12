import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import TopperCard from "@/components/TopperCard";
import { getToppers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Achievers & Results",
  description:
    "RankersPro achievers and results — GATE selections including AIR 12, AIR 26 (GATE EVS), and AIR 94 (GATE ES), with admissions at IIT Delhi, IIT Madras, and IIT Guwahati.",
};

const SUMMARY_STATS = [
  { value: "AIR 12", label: "GATE" },
  { value: "AIR 26", label: "GATE Environmental Engineering (EVS)" },
  { value: "AIR 94", label: "GATE Environmental Science & Engg (ES), 2024" },
  { value: "1,00,000+", label: "Aspirants mentored" },
];

export default function AchieversPage() {
  const toppers = getToppers();
  const byYear = new Map<number, typeof toppers>();
  const undated: typeof toppers = [];
  for (const topper of toppers) {
    if (topper.examYear === undefined) {
      undated.push(topper);
      continue;
    }
    const list = byYear.get(topper.examYear) ?? [];
    list.push(topper);
    byYear.set(topper.examYear, list);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <>
      <section className="bg-brand-gradient">
        <div className="container-page py-16 sm:py-20">
          <SectionHeading
            as="h1"
            light
            eyebrow="Achievers & Results"
            title="Ranks our students have actually earned"
            description="A year-by-year record of IIT/IISc admissions and PSU/state engineering service selections from RankersPro students. Figures shown here are re-verified before every publish."
          />
        </div>
      </section>

      {/* Summary stat grid */}
      <section aria-label="Result highlights" className="py-12 sm:py-14">
        <div className="container-page grid grid-cols-2 gap-6 lg:grid-cols-4">
          {SUMMARY_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-brand-100 bg-white p-6 text-center shadow-card"
            >
              <p className="font-sans text-3xl font-extrabold text-brand-700 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-600 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Grouped by year */}
      <section className="bg-brand-50 py-14 sm:py-16">
        <div className="container-page space-y-14">
          {years.map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">{year}</h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {(byYear.get(year) ?? []).map((topper) => (
                  <TopperCard key={topper.id} topper={topper} variant="result" />
                ))}
              </div>
            </div>
          ))}

          {undated.length > 0 && (
            <div>
              <h2 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
                More Success Stories
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {undated.map((topper) => (
                  <TopperCard key={topper.id} topper={topper} variant="result" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
