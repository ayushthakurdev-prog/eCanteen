import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [
    { title: "Settings — eCanteen" },
    { name: "description", content: "Manage your eCanteen notification, theme, and password settings." },
    { property: "og:title", content: "Settings — eCanteen" },
    { property: "og:description", content: "Manage your eCanteen notification, theme, and password settings." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Settings" />,
});