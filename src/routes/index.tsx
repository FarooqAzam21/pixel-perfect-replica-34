import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/")({
  head: () => pageMeta("Global Freight & Shipping", "Global freight solutions, thoughtfully coordinated from origin to destination. Explore logistics services, shipment tracking, and quote requests."),
  component: HomePage,
});
