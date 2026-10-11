import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/bucket")({
  head: () => ({ meta: [
    { title: "Bucket — eCanteen" },
    { name: "description", content: "Review your favourite eCanteen dishes and orders." },
    { property: "og:title", content: "Bucket — eCanteen" },
    { property: "og:description", content: "Review your favourite eCanteen dishes and orders." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Bucket" />,
});