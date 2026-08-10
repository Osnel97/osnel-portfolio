import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * Ties each section's entrance to scroll position instead of a fixed-
 * duration, trigger-once animation — scroll down and it plays forward,
 * scroll back up and it reverses, exactly like scrubbing a video timeline.
 * `gsap.matchMedia` handles prefers-reduced-motion: under that preference
 * content is simply set to its final visible state, no animation at all.
 */
export default function Reveal({ children, className = '' }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 70, rotateX: -10, transformPerspective: 1000, transformOrigin: '50% 100%' },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              end: 'top 50%',
              scrub: 0.6,
            },
          }
        );
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { autoAlpha: 1, y: 0, rotateX: 0 });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
