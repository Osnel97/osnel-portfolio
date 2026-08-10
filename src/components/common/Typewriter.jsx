import { useEffect, useRef, useState } from 'react';

/**
 * Types `text` out one character at a time with a blinking cursor at the
 * end — either immediately on mount, or (with `startOnView`) the first
 * time it scrolls into view, so headers further down the page "type
 * themselves" as you reach them instead of all firing at once on load.
 *
 * Accessibility: the full string is always available immediately via
 * `aria-label` on the wrapping element, with the animated characters
 * hidden from assistive tech (`aria-hidden`) — screen readers get the
 * complete text right away rather than waiting on or mis-reading a
 * partially-typed string. Under prefers-reduced-motion the full text
 * renders immediately with no animation at all.
 */
export default function Typewriter({
  text,
  as: Tag = 'span',
  speed = 45,
  delay = 0,
  startOnView = false,
  className = '',
}) {
  const ref = useRef(null);
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayed(text);
      return;
    }

    let intervalId;
    let delayId;
    let cancelled = false;

    const startTyping = () => {
      let i = 0;
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
        }
      }, speed);
    };

    const begin = () => {
      if (cancelled) return;
      delayId = setTimeout(startTyping, delay);
    };

    if (!startOnView) {
      begin();
      return () => {
        cancelled = true;
        clearTimeout(delayId);
        clearInterval(intervalId);
      };
    }

    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          begin();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(delayId);
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayed}
        <span className="typewriter-cursor">|</span>
      </span>
    </Tag>
  );
}
