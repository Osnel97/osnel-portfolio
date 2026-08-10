import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';

/**
 * Two soft, blurred glow orbs fixed behind all page content. They drift on
 * their own continuous loop (so the page never looks fully "at rest", like
 * a video with a living background plate) and also shift slowly with
 * overall scroll position for a sense of depth. Split into an outer
 * scroll-driven wrapper and an inner looping orb per glow so the two
 * animations control different transforms and never fight over the same
 * one. Decorative only — aria-hidden, and the whole thing no-ops under
 * prefers-reduced-motion.
 */
export default function AmbientBackground() {
  const scrollWrap1 = useRef(null);
  const scrollWrap2 = useRef(null);
  const orb1 = useRef(null);
  const orb2 = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to(orb1.current, {
          x: 90,
          y: 60,
          duration: 16,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
        gsap.to(orb2.current, {
          x: -80,
          y: -50,
          duration: 20,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 3,
        });

        gsap.to(scrollWrap1.current, {
          y: 260,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
        gsap.to(scrollWrap2.current, {
          y: -220,
          ease: 'none',
          scrollTrigger: { trigger: document.documentElement, start: 'top top', end: 'bottom bottom', scrub: 1 },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div ref={scrollWrap1} className="absolute left-[8%] top-[10%]">
        <div ref={orb1} className="h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px]" />
      </div>
      <div ref={scrollWrap2} className="absolute right-[6%] top-[50%]">
        <div ref={orb2} className="h-[320px] w-[320px] rounded-full bg-accent-2/10 blur-[110px]" />
      </div>
    </div>
  );
}
