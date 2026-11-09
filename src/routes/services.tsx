import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/services")({
  head: () =>
    pageMeta(
      "Freight Services",
      "Explore ocean freight, air freight, land transport, and customs clearance from AA Shipping & Logistics."
    ),
  component: ServicesPage,
});
