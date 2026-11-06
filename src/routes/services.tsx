import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/services")({ head: () => pageMeta("Freight Services", "Explore illustrative ocean, air, land, customs, warehousing, and project cargo service areas."), component: ServicesPage });
