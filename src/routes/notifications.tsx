import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [
    { title: "Notifications — eCanteen" },
    { name: "description", content: "See your eCanteen notifications." },
    { property: "og:title", content: "Notifications — eCanteen" },
    { property: "og:description", content: "See your eCanteen notifications." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Notifications" />,
});