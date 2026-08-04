/**
 * Adds a soft cursor-following glow to any card-like element, plus a
 * subtle lift/scale on hover. Renders as whatever tag is passed via
 * `as` (defaults to "div") so it can wrap both <div> cards and <a> cards.
 */
export default function SpotlightCard({ as: Tag = 'div', children, className = '', ...rest }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x}%`);
    e.currentTarget.style.setProperty('--my', `${y}%`);
  };

  return (
    <Tag onMouseMove={handleMouseMove} className={`shine-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
