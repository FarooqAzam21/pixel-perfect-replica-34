import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () =>
    pageMeta(
      "AA Shipping & Logistics",
      "Connecting businesses across borders. Your global logistics partner for ocean freight, air freight, land transport, and customs clearance."
    ),
  component: HomePage,
});
