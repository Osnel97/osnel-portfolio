import siteData from '../../data/siteData';
import Section from '../layout/Section';
import StatCard from './StatCard';

export default function About() {
  return (
    <Section
      id="about"
      eyebrow="Who I Am"
      title="About"
      subtitle="Background, focus areas, and how I work."
    >
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-muted">
          {siteData.about.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
        <div className="grid gap-5">
          {siteData.stats.map((stat) => (
            <StatCard key={stat.label} num={stat.num} label={stat.label} />
          ))}
        </div>
      </div>
    </Section>
  );
}
