import siteData from '../../data/siteData';
import Section from '../layout/Section';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  // Nothing to show yet — don't render an empty, oddly-titled section.
  if (!siteData.testimonials || siteData.testimonials.length === 0) return null;

  return (
    <Section
      id="testimonials"
      eyebrow="Kind Words"
      title="What People Say"
      subtitle="Feedback from clients and colleagues I've worked with."
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {siteData.testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </Section>
  );
}
