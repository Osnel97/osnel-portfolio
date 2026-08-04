import siteData from '../../data/siteData';
import Section from '../layout/Section';
import SkillCard from './SkillCard';

export default function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Toolbox"
      title="Skills"
      subtitle="Technologies and tools I reach for regularly."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.skills.map((group) => (
          <SkillCard key={group.category} category={group.category} items={group.items} />
        ))}
      </div>
    </Section>
  );
}
