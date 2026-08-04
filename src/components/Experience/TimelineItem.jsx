export default function TimelineItem({ period, role, org, points, isFirst }) {
  return (
    <div
      className={`grid grid-cols-1 gap-6 py-6 sm:grid-cols-[140px_1fr] ${
        isFirst ? "" : "border-t border-border"
      }`}
    >
      <div className="text-sm font-semibold text-accent">{period}</div>
      <div>
        <h3 className="mb-1.5 text-lg font-bold">{role}</h3>
        <div className="mb-2.5 text-sm text-muted">{org}</div>
        <ul className="space-y-1.5 pl-4 text-sm text-muted">
          {points.map((point, i) => (
            <li key={i} className="list-disc">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
