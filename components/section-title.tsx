export function SectionTitle({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className="max-w-3xl">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className={`section-title ${light ? "text-white" : "text-ink"}`}>{title}</h2>
    {copy && <p className={`mt-5 max-w-2xl leading-8 ${light ? "text-white/60" : "text-ink/60"}`}>{copy}</p>}
  </div>;
}
