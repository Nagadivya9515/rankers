import SectionHeading from "./SectionHeading";
import AppDownloadBadges from "./AppDownloadBadges";

const BENEFITS = [
  "Live classes, streamed to any device",
  "Recorded lectures, available offline",
  "Structured test series with instant scoring",
  "Class reminders so you never miss a session",
];

/**
 * "Study anywhere" app-ecosystem section for the Home page. The right-hand
 * side is a pure CSS/Tailwind device mockup — not a real app screenshot
 * (none exist yet) — so it's marked aria-hidden and kept purely
 * decorative; the actual content is carried by the heading and benefit
 * list on the left.
 */
export default function AppEcosystemSection() {
  return (
    <section id="app-ecosystem" aria-labelledby="app-ecosystem-heading" className="relative overflow-hidden bg-brand-gradient py-16 sm:py-20">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            light
            eyebrow="Learn Anywhere"
            title="Your preparation. Every device."
            description="RankersPro isn't just a website — continue the exact same batch across mobile, Windows, and Mac, and pick up right where you left off."
            as="h2"
            headingId="app-ecosystem-heading"
          />
          <ul className="mt-6 space-y-3">
            {BENEFITS.map((benefit) => (
              <li key={benefit} className="flex gap-2.5 text-sm text-brand-50 sm:text-base">
                <svg aria-hidden="true" viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 fill-gold-400">
                  <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" />
                </svg>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <AppDownloadBadges tone="dark" className="mt-8" />
        </div>

        {/* Decorative device mockup — illustrative UI, not a real screenshot */}
        <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Desktop/monitor frame — extra bottom padding after the inner
              "app window" box reserves blank space for the phone card to
              overlap into, so it never collides with the progress text. */}
          <div className="ml-auto w-[88%] rounded-xl border border-white/15 bg-brand-950/60 p-3 pb-20 shadow-card-hover backdrop-blur-sm sm:p-4 sm:pb-24">
            <div className="mb-3 flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="rounded-lg bg-brand-900/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gold-400">
                Continue Learning
              </p>
              <p className="mt-1 text-sm font-bold text-white">Structural Analysis — RP Sir</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[72%] rounded-full bg-gold-500" />
              </div>
              <p className="mt-1.5 text-[11px] font-medium text-brand-200">72% complete</p>
            </div>
          </div>

          {/* Floating phone frame — sits in the monitor's reserved bottom
              margin, poking past its edge for a layered/floating effect. */}
          <div className="absolute bottom-2 -left-2 w-40 rounded-2xl border border-white/15 bg-brand-950/80 p-3 shadow-floating backdrop-blur-sm sm:bottom-3 sm:-left-6 sm:w-48">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-red-500/90 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                Live
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            </div>
            <p className="mt-2 text-xs font-bold text-white">KP Sir — GATE EVS</p>
            <p className="text-[11px] text-brand-200">Water Treatment Unit Processes</p>
            <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-white/5 px-2 py-1.5">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-gold-400">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="text-[10px] font-semibold text-brand-100">38:12</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
