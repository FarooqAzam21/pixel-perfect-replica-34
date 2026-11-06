import { createFileRoute } from "@tanstack/react-router";
import { NetworkPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/network")({ head: () => pageMeta("Global Network", "Explore an illustrative global logistics network. No company routes, locations, or coverage have been verified."), component: NetworkPage });
