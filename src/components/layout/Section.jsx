import Reveal from '../common/Reveal';
import Typewriter from '../common/Typewriter';

/**
 * Reusable section wrapper — every content section (About, Skills, Work, …)
 * renders through this so spacing, borders, and the title/subtitle pattern
 * stay consistent across the page. Content fades/slides into view the
 * first time it scrolls into the viewport, and the small eyebrow label
 * types itself out live once it's on screen.
 */
export default function Section({ id, eyebrow, title, subtitle, children, last = false }) {
  return (
    <section
      id={id}
      className={`py-14 sm:py-20 lg:py-24 ${last ? "" : "border-b border-border"}`}
    >
      <div className="mx-auto max-w-[1080px] px-5 sm:px-6">
        <Reveal>
          {eyebrow && (
            <Typewriter
              as="div"
              text={eyebrow}
              startOnView
              className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-accent"
            />
          )}
          {title && (
            <h2 className="mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h2>
          )}
          {subtitle && (
            <p className="mb-8 text-base text-muted sm:mb-11">{subtitle}</p>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
