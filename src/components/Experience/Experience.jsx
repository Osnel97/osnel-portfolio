import siteData from '../../data/siteData';
import Section from '../layout/Section';
import TimelineItem from './TimelineItem';

export default function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Career"
      title="Experience"
      subtitle="Where I've worked and led."
    >
      <div>
        {siteData.experience.map((role, i) => (
          <TimelineItem key={role.role} {...role} isFirst={i === 0} />
        ))}
      </div>
    </Section>
  );
}
