/**
 * Consistent section heading.
 *
 * `as` keeps the visual style fixed while letting each page choose the correct
 * heading level, so document outline and visual hierarchy stay independent.
 */
export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  align = 'left',
  className = '',
  children,
}) {
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-4 ${centered ? 'items-center text-center' : 'max-w-3xl'} ${className}`}
    >
      {eyebrow && (
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
          <span className="h-px w-8 bg-primary" aria-hidden="true" />
          {eyebrow}
        </p>
      )}

      <Heading
        id={id}
        className="font-display text-3xl font-bold leading-tight tracking-tight text-strong sm:text-4xl lg:text-5xl"
      >
        {title}
      </Heading>

      {description && (
        <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{description}</p>
      )}

      {children}
    </div>
  );
}
