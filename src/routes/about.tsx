import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta(
      "About",
      "Learn about AA Shipping & Logistics' mission, vision, and approach to dependable freight coordination.",
    ),
  component: AboutPage,
});
