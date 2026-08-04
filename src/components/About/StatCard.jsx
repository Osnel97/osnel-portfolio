import SpotlightCard from '../common/SpotlightCard';

export default function StatCard({ num, label }) {
  return (
    <SpotlightCard className="rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent">
      <div className="text-2xl font-extrabold text-accent">{num}</div>
      <div className="mt-1 text-sm text-muted">{label}</div>
    </SpotlightCard>
  );
}
