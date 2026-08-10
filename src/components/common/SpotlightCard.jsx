/**
 * Adds a soft cursor-following glow to any card-like element, plus a
 * subtle lift/scale on hover and a gentle 3D tilt that follows the
 * cursor position (perspective + rotateX/rotateY). Renders as whatever
 * tag is passed via `as` (defaults to "div") so it can wrap both <div>
 * cards and <a> cards.
 */
export default function SpotlightCard({ as: Tag = 'div', tiltStrength = 6, children, className = '', ...rest }) {
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);

    if (reducedMotion()) return;
    const offsetX = (e.clientX - rect.left) / rect.width - 0.5;
    const offsetY = (e.clientY - rect.top) / rect.height - 0.5;
    const rotateY = offsetX * tiltStrength * 2;
    const rotateX = -offsetY * tiltStrength * 2;
    e.currentTarget.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <Tag
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`shine-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
