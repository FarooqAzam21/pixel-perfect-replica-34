import { createFileRoute } from "@tanstack/react-router";
import { TrackPage } from "@/components/logistics-pages";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/track")({ head: () => pageMeta("Shipment Tracking", "Try an explicitly labeled sample shipment. Live carrier tracking is not connected."), component: TrackPage });
