import siteData from '../../data/siteData';
import Avatar from './Avatar';
import SocialLinks from '../SocialLinks/SocialLinks';
import Magnetic from '../common/Magnetic';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[80svh] flex-col justify-center border-b border-border"
    >
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-8 px-5 sm:gap-10 sm:px-6">
        <div className="hero-in">
          <Avatar src={siteData.photo} alt={siteData.name} initials={siteData.initials} />
        </div>

        <div className="min-w-0 flex-1 sm:min-w-[280px]">
          <div className="hero-in mb-4 text-sm uppercase tracking-[2px] text-accent">
            Portfolio
          </div>
          <h1 className="hero-in mb-2.5 text-[clamp(2.75rem,2vw+2.25rem,4.5rem)] font-extrabold leading-[1.05] tracking-tight">
            {siteData.name}
          </h1>
          <div className="hero-in mb-5 text-lg text-muted sm:text-xl">
            {siteData.title}
          </div>
          <p className="hero-in mb-6 max-w-[560px] text-muted">{siteData.tagline}</p>

          {siteData.socialLinks?.length > 0 && (
            <div className="hero-in mb-7">
              <SocialLinks links={siteData.socialLinks} />
            </div>
          )}

          <div className="hero-in-delay-1 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#contact"
                className="btn-shine btn-glow inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-[#150e09] transition-transform hover:-translate-y-0.5"
              >
                Get in touch
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#work"
                className="btn-shine inline-block rounded-lg border border-border px-6 py-3 text-sm font-semibold text-text transition-transform hover:-translate-y-0.5 hover:border-accent"
              >
                View work
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About section"
        className="scroll-cue absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent sm:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
