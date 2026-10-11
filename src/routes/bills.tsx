import { createFileRoute } from "@tanstack/react-router";
import { CanteenScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/bills")({
  head: () => ({ meta: [
    { title: "Transactions — eCanteen" },
    { name: "description", content: "Review your eCanteen transactions and receipts." },
    { property: "og:title", content: "Transactions — eCanteen" },
    { property: "og:description", content: "Review your eCanteen transactions and receipts." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: () => <CanteenScreen screen="Bills" />,
});