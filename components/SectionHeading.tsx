interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
  light?: boolean;
  /** Set to give the heading an id, so a wrapping <section> can use aria-labelledby. */
  headingId?: string;
}

/** Consistent eyebrow + heading + description block used across all pages. */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  light = false,
  headingId,
}: SectionHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow && (
        <p className={light ? "eyebrow text-gold-400" : "eyebrow"}>{eyebrow}</p>
      )}
      <Heading
        id={headingId}
        className={`mt-2 text-3xl sm:text-4xl ${
          light ? "text-white" : "text-brand-900"
        } ${as === "h1" ? "sm:text-5xl" : ""}`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-brand-100" : "text-brand-700"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
