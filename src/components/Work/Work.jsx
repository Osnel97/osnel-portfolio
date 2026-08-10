import { useLayoutEffect, useRef } from 'react';
import siteData from '../../data/siteData';
import Section from '../layout/Section';
import ProjectCard from './ProjectCard';
import { gsap } from '../../lib/gsap';

export default function Work() {
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        gsap.set(cards, { autoAlpha: 0, y: 90, scale: 0.85, rotateY: -14, transformPerspective: 1200 });

        // Pins just the card grid (not the section heading, which already
        // scrolls in normally via Section's Reveal) so the viewport holds
        // still while each project cuts into place in sequence, like a
        // held shot in a video before the scene continues.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 75%',
            end: `+=${cards.length * 60}%`,
            scrub: 0.7,
            pin: true,
            pinSpacing: true,
          },
        });

        cards.forEach((card, i) => {
          tl.to(card, { autoAlpha: 1, y: 0, scale: 1, rotateY: 0, duration: 1 }, i);
        });
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(cardRefs.current.filter(Boolean), { autoAlpha: 1, y: 0, scale: 1, rotateY: 0 });
      });
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section
      id="work"
      eyebrow="Selected Work"
      title="Featured Projects"
      subtitle="Selected work — shipped products and security engagements."
    >
      <div ref={gridRef} className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {siteData.projects.map((project, i) => (
          <div key={project.name} ref={(el) => (cardRefs.current[i] = el)}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </Section>
  );
}
