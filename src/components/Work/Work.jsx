import siteData from '../../data/siteData';
import Section from '../layout/Section';
import ProjectCard from './ProjectCard';

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="Selected Work"
      title="Featured Projects"
      subtitle="Selected work — shipped products and security engagements."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {siteData.projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </Section>
  );
}
