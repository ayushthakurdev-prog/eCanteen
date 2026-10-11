import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/support")({
  head: () => ({ meta: [
    { title: "Support — eCanteen" },
    { name: "description", content: "Contact eCanteen support and browse frequently asked questions." },
    { property: "og:title", content: "Support — eCanteen" },
    { property: "og:description", content: "Contact eCanteen support and browse frequently asked questions." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Support" />,
});