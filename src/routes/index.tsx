import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — eCanteen" },
      { name: "description", content: "Browse the eCanteen menu and place a canteen order." },
      { property: "og:title", content: "Dashboard — eCanteen" },
      { property: "og:description", content: "Browse the eCanteen menu and place a canteen order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <CanteenScreen screen="Dashboard" />,
});