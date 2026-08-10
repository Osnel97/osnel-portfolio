import { useState } from 'react';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

/**
 * Shows the profile photo if one exists at the given path (drop a file at
 * public/assets/profile.jpg); falls back to a circle with initials otherwise.
 */
export default function Avatar({ src, alt, initials }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-[112px] w-[112px] flex-shrink-0 sm:h-[140px] sm:w-[140px]">
      <div className="avatar-glow absolute -inset-3 -z-10 rounded-full bg-accent/25 blur-xl" />
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
