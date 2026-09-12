import Link from "next/link";
import type { Batch } from "@/lib/types";
import { formatINR, discountPercent } from "@/lib/format";
import { PlaceholderCardArt } from "./PlaceholderMedia";

const CATEGORY_ICON: Record<
  Batch["category"],
  "book" | "cap" | "flag" | "building" | "train" | "map" | "users" | "compass"
> = {
  "GATE & ESE": "book",
  "APPSC/TGPSC": "cap",
  "SSC JE": "flag",
  "RRB JE": "train",
  "State AE/JE": "map",
  Mentorship: "users",
  "Career Guidance": "compass",
};

interface BatchCardProps {
  batch: Batch;
}

/** Responsive batch/course card used on the Home featured grid and Batches listing. */
export default function BatchCard({ batch }: BatchCardProps) {
  const percentOff = discountPercent(batch.price, batch.discountPrice);

  return (
    <article className="card-interactive group flex h-full flex-col overflow-hidden">
      <PlaceholderCardArt
        alt={batch.imageAlt}
        label={batch.category}
        icon={CATEGORY_ICON[batch.category]}
        iconClassName="transition-transform duration-300 group-hover:scale-110"
        imageSrc={batch.imageSrc}
      />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow">{batch.category}</p>
        <h3 className="mt-1.5 text-lg font-extrabold text-brand-900 sm:text-xl">
          {batch.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-700">
          {batch.summary}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xl font-extrabold text-brand-900">
            {formatINR(batch.discountPrice)}
          </span>
          {batch.price !== null && (
            <span className="text-sm text-brand-400 line-through">
              {formatINR(batch.price)}
            </span>
          )}
          {percentOff > 0 && (
            <span className="rounded bg-gold-50 px-1.5 py-0.5 text-xs font-bold text-gold-700">
              {percentOff}% off
            </span>
          )}
        </div>

        <Link
          href={`/batches/${batch.slug}`}
          className="btn-outline group/link mt-5 w-full"
          aria-label={`View details for ${batch.name}`}
        >
          View Details
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4 fill-current transition-transform duration-300 group-hover/link:translate-x-1"
          >
            <path d="M11.3 3.3a1 1 0 011.4 0l5 5a1 1 0 010 1.4l-5 5a1 1 0 01-1.4-1.4L14.6 10H3a1 1 0 010-2h11.6l-3.3-3.3a1 1 0 010-1.4z" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
