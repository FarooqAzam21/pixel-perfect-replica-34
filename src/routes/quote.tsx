import { createFileRoute } from "@tanstack/react-router";
import { QuotePage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/quote")({ head: () => pageMeta("Request a Quote", "Prepare a freight quote request with shipment and contact details. No submission endpoint is connected."), component: QuotePage });
