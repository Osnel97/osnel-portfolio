import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * Three soft, blurred glow orbs fixed behind all page content. Each drifts
 * and breathes on its own continuous loop (so the page never looks fully
 * "at rest", like a video with a living background plate) and also shifts
 * with overall scroll position for a sense of depth. Split into an outer
 * scroll-driven wrapper and an inner looping orb per glow — GSAP composes
 * x/y/scale tweens on the same element correctly through its own internal
 * transform cache, so the loop and the scroll-scrub never actually fight
 * each other even though they share a target. Decorative only —
 * aria-hidden, and the whole thing no-ops under prefers-reduced-motion.
 */
export default function AmbientBackground() {
  const scrollWrap1 = useRef(null);
  const scrollWrap2 = useRef(null);
  const scrollWrap3 = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const orb3 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(orb1.current, {
          x: 160,
          y: 110,
          scale: 1.25,
          duration: 9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(orb2.current, {
          x: -150,
          y: -90,
          scale: 1.3,
          duration: 11,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });
        gsap.to(orb3.current, {
          x: 110,
          y: -130,
          scale: 1.2,
          duration: 13,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 3,
        });

        gsap.to(scrollWrap1.current, {
          y: 320,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        gsap.to(scrollWrap2.current, {
          y: -280,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        gsap.to(scrollWrap3.current, {
          y: 200,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={scrollWrap1} className="absolute left-[6%] top-[8%]">
        <div ref={orb1} className="h-[460px] w-[460px] rounded-full bg-accent/[0.16] blur-[100px]" />
      </div>
      <div ref={scrollWrap2} className="absolute right-[4%] top-[45%]">
        <div ref={orb2} className="h-[400px] w-[400px] rounded-full bg-accent-2/[0.16] blur-[100px]" />
      </div>
      <div ref={scrollWrap3} className="absolute left-[30%] top-[80%]">
        <div ref={orb3} className="h-[340px] w-[340px] rounded-full bg-accent/[0.12] blur-[100px]" />
      </div>
    </div>
  );
}
