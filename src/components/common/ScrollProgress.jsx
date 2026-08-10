import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * A thin bar fixed to the very top of the viewport that fills left-to-right
 * as you scroll through the page — the same visual language as a video's
 * playback progress bar, reinforcing that this is a single continuous
 * "watch" rather than a stack of static sections.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      const build = (scrub) => {
        gsap.fromTo(
          barRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub,
            },
          }
        );
      };

      // Smoothed tracking normally; instant (no added lag/motion) under
      // reduced-motion, while still keeping the bar itself since it's a
      // 1:1 reflection of the user's own scroll, not independent motion.
      mm.add('(prefers-reduced-motion: no-preference)', () => build(0.3));
      mm.add('(prefers-reduced-motion: reduce)', () => build(true));
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[5px] w-full bg-transparent"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-accent to-accent-2 shadow-[0_0_12px_2px_rgba(246,141,49,0.55)]"
      />
    </div>
  );
}
