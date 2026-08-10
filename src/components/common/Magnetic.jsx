import { useRef } from 'react';

/**
 * Wraps any element (usually a button or icon link) and makes it drift
 * gently toward the cursor while hovered, snapping back on mouse leave.
 * Also tilts it in 3D (perspective + rotateX/rotateY) along the same
 * cursor offset, so buttons and icons read as small physical objects
 * rather than flat drifting labels. Pure CSS-transform based — no
 * animation library needed.
 */
export default function Magnetic({ children, strength = 14, tiltStrength = 10, className = '' }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    // Respect prefers-reduced-motion: skip the cursor-follow drift/tilt
    // entirely instead of just cutting the CSS transition (which would
    // still leave an instant, disorienting snap on every mousemove).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const translateX = (x / rect.width) * strength;
    const translateY = (y / rect.height) * strength;
    const rotateY = (x / rect.width) * tiltStrength;
    const rotateX = -(y / rect.height) * tiltStrength;
    el.style.transform = `perspective(400px) translate(${translateX}px, ${translateY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(400px) translate(0, 0) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic inline-block ${className}`}
    >
      {children}
    </div>
  );
}
