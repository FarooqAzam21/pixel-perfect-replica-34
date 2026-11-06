import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
