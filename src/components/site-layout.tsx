import { useEffect, type ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { ContactFab } from "@/components/contact-fab";

const motionTargets = [
  ".site-shell main > section:not(.home-hero) h2",
  ".site-shell main > section.page-intro h1",
  ".site-shell main .tracking-layout > *",
  ".site-shell main .section-heading-row",
  ".site-shell main .service-feature",
  ".site-shell main .freight-modes-heading",
  ".site-shell main .network-content > *",
  ".site-shell main .approach-layout > *",
  ".site-shell main .journey-heading > *",
  ".site-shell main .principle-card",
  ".site-shell main .journey-step",
  ".site-shell main .industry-head > *",
  ".site-shell main .industry-row",
  ".site-shell main .service-detail",
  ".site-shell main .network-page-map",
  ".site-shell main .network-regions > *",
  ".site-shell main .region-list > div",
  ".site-shell main .freight-mode-card",
  ".site-shell main .track-page-section > *",
  ".site-shell main .quote-layout > *",
  ".site-shell main .contact-page-layout > *",
  ".site-shell main .contact-band-content > *",
  ".site-shell main .approach-image img",
  ".site-shell main .about-layout img",
  ".site-footer .footer-main > *",
  ".site-footer .footer-bottom",
].join(", ");

function MotionObserver() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-shell");
    if (!root || !("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | undefined;
    let routeObserver: MutationObserver | undefined;
    let initialized = false;

    const clearMotion = () => {
      observer?.disconnect();
      observer = undefined;
      routeObserver?.disconnect();
      routeObserver = undefined;
      initialized = false;
      root.classList.remove("motion-enhanced");
      root.querySelectorAll("[data-motion-reveal]").forEach((element) => {
        element.removeAttribute("data-motion-reveal");
        element.classList.remove("is-motion-visible");
      });
    };

    const observeContent = () => {
      if (!initialized) return;

      observer ??= new IntersectionObserver(
        (entries, currentObserver) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-motion-visible");
              currentObserver.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );

      root.classList.add("motion-enhanced");
      root.querySelectorAll(motionTargets).forEach((element) => {
        if (element.hasAttribute("data-motion-reveal")) return;
        element.setAttribute("data-motion-reveal", "");
        observer?.observe(element);
      });
    };

    const startMotion = () => {
      if (initialized) return;
      initialized = true;
      observeContent();
      routeObserver = new MutationObserver(observeContent);
      routeObserver.observe(root, { childList: true, subtree: true });
    };

    const hydrationDelay = window.setTimeout(startMotion, 500);

    return () => {
      window.clearTimeout(hydrationDelay);
      routeObserver?.disconnect();
      clearMotion();
    };
  }, []);

  return null;
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell">
      <MotionObserver />
      <SiteHeader />
      {children}
      <SiteFooter />
      <ContactFab />
    </div>
  );
}
