import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/about")({ head: () => pageMeta("About", "Learn about Meridian Freight’s logistics approach. Company history and operating details await confirmation."), component: AboutPage });
