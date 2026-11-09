import { Link } from "@tanstack/react-router";
import { Menu, MoveUpRight, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { Button } from "@/components/ui/button";
import { company, whatsappUrl } from "@/lib/company";

const links = [
  ["About", "/about"],
  ["Services", "/services"],
  ["Network", "/network"],
  ["Track", "/track"],
  ["Contact", "/contact"],
] as const;

function BrandLogo() {
  return (
    <span className="brand-logo-lockup">
      <img className="brand-logo" src={logo} alt="" />
      <span className="brand-logo-name">{company.name}</span>
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-header-inner page-shell">
        <Link
          to="/"
          className="brand-lockup"
          aria-label={`${company.name} home`}
          onClick={() => setOpen(false)}
        >
          <BrandLogo />
        </Link>
        <nav
          id="primary-navigation"
          className={open ? "site-nav is-open" : "site-nav"}
          aria-label="Main navigation"
        >
          {links.map(([label, href]) => (
            <Link key={href} to={href} className="nav-link" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Button asChild className="nav-quote">
            <Link to="/quote" onClick={() => setOpen(false)}>
              Request a quote <MoveUpRight size={15} />
            </Link>
          </Button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand-lockup">
            <BrandLogo />
          </Link>
          <p>{company.tagline}. {company.slogan}.</p>
        </div>
        <div className="footer-column">
          <span className="footer-heading">Explore</span>
          <Link to="/about">About</Link>
          <Link to="/services">Services</Link>
          <Link to="/network">Global network</Link>
        </div>
        <div className="footer-column">
          <span className="footer-heading">Shipments</span>
          <Link to="/track">Track shipment</Link>
          <Link to="/quote">Request a quote</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-column footer-contact">
          <span className="footer-heading">Contact</span>
          {company.phones.map((phone) => (
            <a
              key={phone.whatsapp}
              href={whatsappUrl(phone.whatsapp)}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp {phone.display}
            </a>
          ))}
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <address>{company.address.map((line) => <span key={line}>{line}</span>)}</address>
          <Link to="/contact">
            Contact us <MoveUpRight size={14} />
          </Link>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>
          © {new Date().getFullYear()} {company.name}. {company.tagline}.
        </span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
}
