import { useEffect, useRef } from 'react';

/**
 * A generative, continuously-animated gradient visual behind the Hero
 * content — several soft colored blobs drifting and blending on a canvas,
 * giving the hero a "living background plate" feel closer to a video loop
 * than a static image. This is drawn procedurally, not a literal video
 * file (none exists for this site, and sourcing a stock one isn't
 * something to do without a real asset from you). Renders a single static
 * frame and skips the animation loop entirely under prefers-reduced-motion.
 */
export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let frameId = null;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const blobs = [
      { baseX: 0.25, baseY: 0.35, r: 0.34, hue: '246,141,49', speed: 0.6, phase: 0 },
      { baseX: 0.75, baseY: 0.3, r: 0.3, hue: '226,97,50', speed: 0.5, phase: 2.1 },
      { baseX: 0.5, baseY: 0.8, r: 0.32, hue: '246,141,49', speed: 0.4, phase: 4.2 },
    ];

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height);
      const time = t / 1000;
      blobs.forEach((b) => {
        const x = (b.baseX + Math.sin(time * b.speed + b.phase) * 0.07) * width;
        const y = (b.baseY + Math.cos(time * b.speed * 0.8 + b.phase) * 0.07) * height;
        const r = b.r * Math.max(width, height);
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${b.hue}, 0.22)`);
        gradient.addColorStop(1, `rgba(${b.hue}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
      if (!reduced) frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ filter: 'blur(40px)' }}
    />
  );
}
