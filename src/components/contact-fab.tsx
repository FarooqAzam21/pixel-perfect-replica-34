import { useState } from "react";
import { Mail, MapPin, X } from "lucide-react";
import { company, whatsappUrl } from "@/lib/company";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.04 3.2a12.7 12.7 0 0 0-10.9 19.23L3.4 28.8l6.5-1.7a12.7 12.7 0 1 0 6.14-23.9Zm0 23.1a10.4 10.4 0 0 1-5.3-1.45l-.38-.23-3.86 1.01 1.03-3.76-.25-.39a10.43 10.43 0 1 1 8.76 4.82Zm5.73-7.81c-.31-.16-1.82-.9-2.1-1-.28-.1-.49-.16-.69.16-.21.31-.8 1-.98 1.21-.18.2-.36.23-.67.08-.31-.16-1.3-.48-2.48-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.05-1.08 2.56s1.1 2.97 1.26 3.18c.15.2 2.16 3.3 5.23 4.63.73.31 1.3.5 1.74.64.73.23 1.4.2 1.93.12.59-.09 1.82-.75 2.07-1.48.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36Z"
      />
    </svg>
  );
}

export function ContactFab() {
  const [open, setOpen] = useState(false);

  return (
    <aside className="contact-fab" aria-label="Quick contact">
      <section
        className="contact-fab-panel"
        id="quick-contact-panel"
        aria-label="Contact details"
        hidden={!open}
      >
        <div className="contact-fab-heading">
          <div>
            <span>{company.name}</span>
            <strong>How can we help?</strong>
          </div>
          <button
            className="contact-fab-close"
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close contact details"
          >
            <X size={18} />
          </button>
        </div>
        <p className="contact-fab-proprietor">{company.proprietor} · Proprietor</p>
        <div className="contact-fab-links">
          {company.phones.map((phone) => (
            <a
              key={phone.whatsapp}
              href={whatsappUrl(phone.whatsapp)}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon />
              <span>{phone.display}</span>
            </a>
          ))}
          <a href={`mailto:${company.email}`}>
            <Mail size={18} />
            <span>{company.email}</span>
          </a>
          <div className="contact-fab-address">
            <MapPin size={18} />
            <span>{company.address.join(" ")}</span>
          </div>
        </div>
      </section>
      <button
        className="contact-fab-button"
        type="button"
        aria-label={open ? "Hide contact details" : "Show contact details"}
        aria-expanded={open}
        aria-controls="quick-contact-panel"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <WhatsAppIcon />}
      </button>
    </aside>
  );
}
