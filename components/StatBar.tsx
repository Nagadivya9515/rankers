export interface Stat {
  value: string;
  label: string;
}

// Verified brochure figures — see SRS §4.1. Kept in one place so Home and
// any future page reuse identical numbers.
export const BROCHURE_STATS: Stat[] = [
  { value: "22+", label: "Years of senior faculty experience" },
  { value: "3", label: "Master mentors, one faculty team" },
  { value: "1,00,000+", label: "Students mentored" },
  { value: "14+", label: "Years of proven selections" },
];

interface StatBarProps {
  stats?: Stat[];
}

/** Bold stat bar for the Home page — large sans-serif numerals per brand direction. */
export default function StatBar({ stats = BROCHURE_STATS }: StatBarProps) {
  return (
    <section aria-label="RankersPro track record" className="bg-brand-900">
      <div className="container-page grid grid-cols-2 gap-6 py-10 sm:py-12 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-sans text-3xl font-extrabold text-gold-400 sm:text-4xl lg:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-200 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
