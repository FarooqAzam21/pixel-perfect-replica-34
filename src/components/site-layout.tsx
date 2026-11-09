import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ContactFab } from "@/components/contact-fab";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
      <ContactFab />
    </div>
  );
}
