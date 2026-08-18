export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-500">{eyebrow}</p>
      )}
      <h2 className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${light ? "text-white" : "text-ink"}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg ${light ? "text-zinc-300" : "text-zinc-600"}`}>{description}</p>
      )}
    </div>
  );
}
