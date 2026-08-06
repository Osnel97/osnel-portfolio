import SpotlightCard from '../common/SpotlightCard';

export default function ProjectCard({ name, description, highlights, stack }) {
  return (
    <SpotlightCard className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent">
      <h3 className="mb-2.5 text-xl font-bold">{name}</h3>
      <p className="mb-4 text-sm text-muted">{description}</p>

      {highlights && highlights.length > 0 && (
        <ul className="mb-5 space-y-1.5 text-sm text-muted">
          {highlights.map((point, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-accent">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-accent-2/10 px-2.5 py-1 text-xs text-accent"
          >
            {tech}
          </span>
        ))}
      </div>
    </SpotlightCard>
  );
}
