import { Link } from "@tanstack/react-router";
import { Menu, MoveUpRight, Ship, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const links = [
  ["About", "/about"], ["Services", "/services"], ["Network", "/network"], ["Track", "/track"], ["Contact", "/contact"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="site-header-inner page-shell">
        <Link to="/" className="brand-lockup" aria-label="Meridian Freight home" onClick={() => setOpen(false)}>
          <span className="brand-mark"><Ship size={19} strokeWidth={1.8} /></span>
          <span className="brand-name">MERIDIAN<span>FREIGHT</span></span>
        </Link>
        <nav className={open ? "site-nav is-open" : "site-nav"} aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} to={href} className="nav-link" onClick={() => setOpen(false)}>{label}</Link>)}
          <Button asChild className="nav-quote"><Link to="/quote" onClick={() => setOpen(false)}>Request a quote <MoveUpRight size={15} /></Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
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
        <div className="footer-brand"><Link to="/" className="brand-lockup"><span className="brand-mark"><Ship size={19} /></span><span className="brand-name">MERIDIAN<span>FREIGHT</span></span></Link><p>Moving business forward, one carefully planned shipment at a time.</p></div>
        <div className="footer-column"><span className="footer-heading">Explore</span><Link to="/about">About</Link><Link to="/services">Services</Link><Link to="/network">Global network</Link></div>
        <div className="footer-column"><span className="footer-heading">Shipments</span><Link to="/track">Track shipment</Link><Link to="/quote">Request a quote</Link><Link to="/contact">Contact</Link></div>
        <div className="footer-column"><span className="footer-heading">Company details</span><span>Contact and operating details<br />awaiting business confirmation.</span><Link to="/contact">Get in touch <MoveUpRight size={14} /></Link></div>
      </div>
      <div className="page-shell footer-bottom"><span>© {new Date().getFullYear()} Meridian Freight. Brand and content subject to business confirmation.</span><span>Privacy · Terms</span></div>
    </footer>
  );
}
