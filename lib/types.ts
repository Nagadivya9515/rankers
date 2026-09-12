// Shared content types for RankersPro static data files.
// Keep these in sync with data/*.json — every field consumed by a page
// or component should be declared here so content edits stay type-safe.

export interface Faculty {
  id: string;
  name: string;
  shortName: string;
  title: string;
  subject: string;
  yearsExperience: number;
  ownRank: string;
  priorAffiliations: string[];
  credentials: string[];
  bio: string[];
  /** Two-letter (or short) initials shown in the placeholder avatar fallback. */
  initials: string;
  /** Alt text for the faculty portrait (real photo, or placeholder if photoSrc is unset). */
  photoAlt: string;
  /** Path under /public to a real portrait. Falls back to InitialsAvatar when unset. */
  photoSrc?: string;
}

// GATE & ESE / APPSC & TGPSC / SSC JE / RRB JE / State AE-JE cover the SRS's
// original 5 categories; Mentorship and Career Guidance were added once the
// real AppX course catalog came in — those two product lines exist for real
// and needed a home. "Free Resource" catalog entries (PDFs, free lectures,
// free test series, syllabus) are deliberately NOT modeled as batches here —
// they're covered by the dedicated /resources page instead.
export type BatchCategory =
  | "GATE & ESE"
  | "APPSC/TGPSC"
  | "SSC JE"
  | "RRB JE"
  | "State AE/JE"
  | "Mentorship"
  | "Career Guidance";

export interface Batch {
  id: string;
  slug: string;
  name: string;
  category: BatchCategory;
  summary: string;
  description: string[];
  /** Optional — omitted (not fabricated) when the real catalog didn't specify syllabus coverage. */
  coverage?: string[];
  /** null for a small number of real catalog entries with no listed original price (discount-only). */
  price: number | null;
  discountPrice: number;
  currency: "INR";
  /** Real validity/eligibility text from the catalog (e.g. "1/2/3-year subscription options"). Optional, never invented. */
  duration?: string;
  /** Optional — only set when actually confirmed; the detail page hides this row rather than guess. */
  mode?: string;
  faculty: string[];
  highlights?: string[];
  appxUrl: string;
  /** Alt text for the batch card art (real photo when imageSrc is set, else the CSS placeholder). */
  imageAlt: string;
  /** Path under /public to real batch creative. Falls back to the CSS icon placeholder when unset. */
  imageSrc?: string;
}

export interface Topper {
  id: string;
  name: string;
  rank: string;
  exam: string;
  /** Omitted (never guessed) when the student's own testimonial didn't state an exam year. */
  examYear?: number;
  quote: string;
  /** Where confirmed by the student's own words (e.g. "IIT Bombay", "NTPC"). Optional. */
  institution?: string;
  youtubeUrl?: string;
  initials: string;
  photoAlt: string;
}

/** A general (non-rank) student testimonial — real quotes pulled from AppX's testimonial CMS export. */
export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  initials: string;
}

export type AppPlatform = "android" | "windows" | "mac";

export interface AppLink {
  id: string;
  platform: AppPlatform;
  label: string;
  store: string;
  /**
   * Real store URL once published. "#" is a deliberate not-live-yet
   * placeholder — AppDownloadBadges renders those as "Coming Soon" rather
   * than a dead link that looks clickable. Replace before launch, and drop
   * any platform here that doesn't actually have a build (see SRS §5.4
   * accuracy requirement — same rule as the legal-page placeholders).
   */
  url: string;
}

export type ResourceType = "video" | "pdf" | "article";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  url: string;
  /** e.g. "12:34" for video, "2.4 MB" for pdf, "8 min read" for article */
  meta: string;
}
