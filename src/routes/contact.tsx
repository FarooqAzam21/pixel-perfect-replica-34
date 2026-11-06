import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/contact")({ head: () => pageMeta("Contact", "Contact Meridian Freight. Company contact details are awaiting confirmation."), component: ContactPage });
