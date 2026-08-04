import SpotlightCard from '../common/SpotlightCard';

export default function SkillCard({ category, items }) {
  return (
    <SpotlightCard className="rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent">
      <h3 className="mb-3.5 text-sm tracking-wide text-accent-2">{category}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-border bg-bg-alt px-3 py-1.5 text-sm text-text transition-colors hover:border-accent hover:text-accent"
          >
            {item}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
}
