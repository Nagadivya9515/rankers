import type { Testimonial } from "@/lib/types";
import { InitialsAvatar } from "./PlaceholderMedia";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

/** A general (non-rank) student testimonial quote — used on the Home page testimonial snippet. */
export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
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
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <InitialsAvatar
          initials={testimonial.initials}
          alt={`Placeholder avatar for ${testimonial.name}, RankersPro student`}
          size="sm"
          palette="gold"
        />
        <div>
          <p className="text-sm font-bold text-brand-900">{testimonial.name}</p>
          <p className="text-xs font-semibold text-gold-600">RankersPro Student</p>
        </div>
      </figcaption>
    </figure>
  );
}
