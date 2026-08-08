interface SectionHeadingProps {
  headingId?: string;
  eyebrow: string;
  title: string;
  description: string;
  descriptionBelow?: string;
  align?: "left" | "center";
  headingLevel?: "h2" | "h3";
}

export function SectionHeading({
  headingId,
  eyebrow,
  title,
  description,
  descriptionBelow,
  align = "left",
  headingLevel = "h2",
}: SectionHeadingProps) {
  const alignmentClasses = align === "center" ? "mx-auto text-center" : "text-left";
  const Heading = headingLevel;

  return (
    <div className={`max-w-2xl ${alignmentClasses}`}>
      <p className="brand-subtitle">{eyebrow}</p>
      <Heading id={headingId} className="brand-heading mt-3 text-3xl font-semibold tracking-tight text-brand-black sm:text-4xl">
        {title}
      </Heading>
      <p className="mt-4 text-base leading-7 text-brand-text-muted sm:text-lg sm:leading-8">{description}</p>
      {descriptionBelow ? (
        <p className="mt-3 text-base leading-7 text-brand-text-muted">{descriptionBelow}</p>
      ) : null}
    </div>
  );
}
