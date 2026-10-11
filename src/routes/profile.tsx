import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [
    { title: "Profile — eCanteen" },
    { name: "description", content: "View and edit your eCanteen profile." },
    { property: "og:title", content: "Profile — eCanteen" },
    { property: "og:description", content: "View and edit your eCanteen profile." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Profile" />,
});