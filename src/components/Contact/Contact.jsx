import siteData from '../../data/siteData';
import Section from '../layout/Section';
import ContactCard from './ContactCard';
import { MailIcon, WhatsappIcon } from '../SocialLinks/icons';

export default function Contact() {
  const { email, whatsappNumber, whatsappCountryCode, availability } = siteData.contact;
  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappCountryCode}${whatsappNumber.replace(/^0+/, '')}`
    : null;

  return (
    <Section
      id="contact"
      eyebrow="Get In Touch"
      title="Let's Connect"
      subtitle="Open to collaboration, consulting, and interesting technical problems."
      last
    >
      {availability && (
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          {availability}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {email && (
          <ContactCard
            icon={MailIcon}
            label="Email"
            action="Send an email"
            value={email}
            href={`mailto:${email}`}
          />
        )}
        {whatsappHref && (
          <ContactCard
            icon={WhatsappIcon}
            label="WhatsApp"
            action="Message me"
            value={whatsappNumber}
            href={whatsappHref}
            external
          />
        )}
      </div>
    </Section>
  );
}
