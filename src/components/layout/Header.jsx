import { useState } from 'react';
import siteData from '../../data/siteData';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.7)] backdrop-blur">
      <nav className="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-4 sm:px-6">
        <a href="#top" className="font-bold tracking-wide" onClick={() => setOpen(false)}>
          {siteData.name}
        </a>

        <ul className="hidden gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link text-sm text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border text-text transition-colors hover:border-accent md:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`overflow-hidden border-t border-border bg-bg/95 backdrop-blur transition-[max-height] duration-300 ease-out md:hidden ${
          open ? 'max-h-96' : 'max-h-0 border-t-0'
        }`}
      >
        <ul className="flex flex-col px-5 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-3.5 text-base text-muted transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
