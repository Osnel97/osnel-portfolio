import { useState } from 'react';
import SpotlightCard from '../common/SpotlightCard';
import { resolveAssetPath } from '../../lib/resolveAssetPath';

export default function TestimonialCard({ name, role, company, quote, photoUrl }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <SpotlightCard className="rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-accent">
      <p className="mb-5 text-sm text-muted">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-bg-alt text-sm font-bold text-accent">
          {photoUrl && !failed ? (
            <img
              src={resolveAssetPath(photoUrl)}
              alt={name}
              className="h-full w-full object-cover"
              onError={() => setFailed(true)}
            />
          ) : (
            initials
          )}
        </div>
        <div>
          <div className="text-sm font-semibold">{name}</div>
          <div className="text-xs text-muted">
            {[role, company].filter(Boolean).join(' · ')}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
