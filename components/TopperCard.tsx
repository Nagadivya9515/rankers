import type { Topper } from "@/lib/types";
import { InitialsAvatar } from "./PlaceholderMedia";

interface TopperCardProps {
  topper: Topper;
  /** "quote" (Home testimonial snippet) or "result" (Achievers listing). */
  variant?: "quote" | "result";
}

export default function TopperCard({ topper, variant = "result" }: TopperCardProps) {
  if (variant === "quote") {
    return (
      <figure className="card-interactive relative flex h-full flex-col p-6 sm:p-7">
        <svg
          aria-hidden="true"
          viewBox="0 0 32 24"
          className="absolute right-6 top-5 h-8 w-8 fill-gold-100"
        >
          <path d="M9.4 24c-2.5 0-4.5-.85-6-2.55C1.8 19.7 1 17.5 1 14.8c0-2.9.9-5.6 2.7-8.1C5.5 4.2 8 2 11.2 0l3 3.7c-2.1 1.5-3.7 2.9-4.8 4.4-1.1 1.4-1.7 2.7-1.9 3.9.5-.2 1.1-.3 1.8-.3 1.8 0 3.3.6 4.4 1.8 1.2 1.2 1.8 2.7 1.8 4.5 0 1.9-.6 3.4-1.9 4.6-1.2 1.2-2.8 1.4-4.2 1.4zm17 0c-2.5 0-4.5-.85-6-2.55-1.6-1.75-2.4-3.95-2.4-6.65 0-2.9.9-5.6 2.7-8.1C22.5 4.2 25 2 28.2 0l3 3.7c-2.1 1.5-3.7 2.9-4.8 4.4-1.1 1.4-1.7 2.7-1.9 3.9.5-.2 1.1-.3 1.8-.3 1.8 0 3.3.6 4.4 1.8 1.2 1.2 1.8 2.7 1.8 4.5 0 1.9-.6 3.4-1.9 4.6-1.2 1.2-2.8 1.4-4.2 1.4z" />
        </svg>
        <blockquote className="relative flex-1 font-serif text-lg italic leading-relaxed text-brand-800">
          &ldquo;{topper.quote}&rdquo;
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          <InitialsAvatar initials={topper.initials} alt={topper.photoAlt} size="sm" palette="gold" />
          <div>
            <p className="text-sm font-bold text-brand-900">{topper.name}</p>
            <p className="text-xs font-semibold text-gold-600">
              {topper.rank} · {topper.exam}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }

  return (
    <article className="card-interactive flex items-start gap-4 p-5">
      <InitialsAvatar initials={topper.initials} alt={topper.photoAlt} size="md" palette="gold" />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-base font-extrabold text-brand-900">{topper.name}</h3>
          <span className="text-sm font-bold text-gold-600">{topper.rank}</span>
        </div>
        <p className="mt-0.5 text-sm text-brand-700">{topper.exam}</p>
        <p className="mt-2 text-sm italic text-brand-600">&ldquo;{topper.quote}&rdquo;</p>
        {topper.youtubeUrl && (
          <a
            href={topper.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-focus mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-gold-600"
            aria-label={`Watch ${topper.name}'s video testimonial on YouTube`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M10 8.64L15.27 12 10 15.36V8.64zM12 4C7 4 3.27 4.44 3.27 4.44A2.78 2.78 0 001 7.2S.75 9.62.75 12s.25 4.8.25 4.8a2.78 2.78 0 002.27 2.76S7 20 12 20s9-.44 9-.44a2.78 2.78 0 002.27-2.76s.25-2.38.25-4.8-.25-4.8-.25-4.8a2.78 2.78 0 00-2.27-2.76S17 4 12 4z" />
            </svg>
            Watch video testimonial
          </a>
        )}
      </div>
    </article>
  );
}
