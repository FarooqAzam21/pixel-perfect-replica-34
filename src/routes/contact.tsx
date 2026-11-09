import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta("Contact", "Contact AA Shipping & Logistics in Karachi by WhatsApp, phone, or email."),
  component: ContactPage,
});
