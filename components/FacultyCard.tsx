import type { Faculty } from "@/lib/types";
import { InitialsAvatar } from "./PlaceholderMedia";

interface FacultyCardProps {
  faculty: Faculty;
  /** "compact" for the Home/preview grid, "full" for the dedicated Faculty page. */
  variant?: "compact" | "full";
}

export default function FacultyCard({ faculty, variant = "full" }: FacultyCardProps) {
  return (
    <article className="card-interactive group flex h-full flex-col p-6 sm:p-7">
      <div className="flex items-start gap-4">
        <InitialsAvatar
          initials={faculty.initials}
          alt={faculty.photoAlt}
          size="lg"
          palette="brand"
          className="transition-transform duration-300 group-hover:scale-105"
          photoSrc={faculty.photoSrc}
        />
        <div>
          <h3 className="text-xl font-extrabold text-brand-900">{faculty.name}</h3>
          <p className="tagline mt-0.5 text-base">{faculty.title}</p>
          <p className="mt-1 text-sm font-semibold text-brand-600">
            {faculty.yearsExperience}+ years experience · {faculty.ownRank}
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Prior affiliations">
        {faculty.priorAffiliations.map((affiliation) => (
          <li
            key={affiliation}
            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700"
          >
            {affiliation}
          </li>
        ))}
      </ul>

      {variant === "full" && (
        <>
          <div className="mt-5 space-y-3">
            {faculty.bio.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-brand-700">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-5 border-t border-brand-100 pt-5">
            <h4 className="text-xs font-bold uppercase tracking-wide text-gold-600">
              Credentials & Results
            </h4>
            <ul className="mt-3 space-y-2">
              {faculty.credentials.map((credential) => (
                <li key={credential} className="flex gap-2 text-sm text-brand-800">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-4 w-4 shrink-0 fill-gold-500"
                  >
                    <path d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z" />
                  </svg>
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {variant === "compact" && (
        <p className="mt-4 text-sm leading-relaxed text-brand-700">{faculty.bio[0]}</p>
      )}
    </article>
  );
}
