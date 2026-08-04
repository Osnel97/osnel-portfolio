import SpotlightCard from '../common/SpotlightCard';

export default function ContactCard({ icon: Icon, label, action, value, href, external = false }) {
  return (
    <SpotlightCard
      as="a"
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-bg-alt text-accent transition-colors group-hover:bg-accent group-hover:text-[#150e09]">
        <Icon width={20} height={20} />
      </div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
        <div className="truncate text-base font-bold">{action}</div>
        <div className="truncate text-sm text-muted">{value}</div>
      </div>
      <div className="ml-auto text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
        →
      </div>
    </SpotlightCard>
  );
}
