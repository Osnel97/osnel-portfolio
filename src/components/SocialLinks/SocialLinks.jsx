import {
  FacebookIcon,
  GithubIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  TwitterIcon,
} from './icons';
import Magnetic from '../common/Magnetic';

const ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  x: TwitterIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  email: MailIcon,
};

/** Renders a row of icon links for whatever socials are configured in
 *  site content. Falls back to a generic globe icon for unknown platforms.
 *  Entries still pointing at the "#" placeholder (see siteData.js) are
 *  skipped rather than rendered as dead links — a live link that goes
 *  nowhere is a worse trust signal than the icon not being there yet. */
export default function SocialLinks({ links, size = 'md' }) {
  const validLinks = (links || []).filter((link) => link.url && link.url !== '#');
  if (validLinks.length === 0) return null;

  const dimension = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {validLinks.map((link) => {
        const Icon = ICONS[link.platform?.toLowerCase()] || GlobeIcon;
        return (
          <Magnetic key={link.platform + link.url} strength={10}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label || link.platform}
              title={link.label || link.platform}
              className={`flex ${dimension} flex-shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent`}
            >
              <Icon />
            </a>
          </Magnetic>
        );
      })}
    </div>
  );
}
