import { useRef } from 'react';

/**
 * Wraps any element (usually a button or icon link) and makes it drift
 * gently toward the cursor while hovered, snapping back on mouse leave.
 * Pure CSS-transform based — no animation library needed.
 */
export default function Magnetic({ children, strength = 14, className = '' }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    // Respect prefers-reduced-motion: skip the cursor-follow drift entirely
    // instead of just cutting the CSS transition (which would still leave
    // an instant, disorienting snap on every mousemove).
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${(x / rect.width) * strength}px, ${(y / rect.height) * strength}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = 'translate(0, 0)';
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
