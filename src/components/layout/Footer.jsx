import siteData from '../../data/siteData';
import SocialLinks from '../SocialLinks/SocialLinks';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-9 text-center text-sm text-muted">
      <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-4 px-5 sm:px-6">
        {siteData.socialLinks?.some((link) => link.url && link.url !== '#') && (
          <SocialLinks links={siteData.socialLinks} />
        )}
        <div>
          © {year} {siteData.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
