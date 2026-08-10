import { useState } from 'react';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

/**
 * Shows the profile photo if one exists at the given path (drop a file at
 * public/assets/profile.jpg); falls back to a circle with initials otherwise.
 * `parallaxX`/`parallaxY` (each roughly -1..1, driven by Hero's mousemove
 * tracking) tilt the portrait in 3D and shift the glow layer at a
 * different rate, giving the hero a sense of depth between the two layers.
 */
export default function Avatar({ src, alt, initials, parallaxX = 0, parallaxY = 0 }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="relative h-[112px] w-[112px] flex-shrink-0 sm:h-[140px] sm:w-[140px]"
      style={{
        transform: `perspective(600px) rotateY(${parallaxX * 8}deg) rotateX(${-parallaxY * 8}deg)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      <div
        className="avatar-glow absolute -inset-3 -z-10 rounded-full bg-accent/25 blur-xl"
        style={{ translate: `${-parallaxX * 6}px ${-parallaxY * 6}px` }}
      />
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-border bg-card">
        {src && !failed ? (
          <img
            src={resolveAssetPath(src)}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-bg-alt text-3xl font-extrabold text-accent sm:text-4xl">
            {initials}
          </div>
        )}
      </div>
    </div>
  );
}
