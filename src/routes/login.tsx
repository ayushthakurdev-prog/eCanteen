import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/canteen-app";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — eCanteen" },
      { name: "description", content: "Log in to eCanteen to make your order." },
      { property: "og:title", content: "Login — eCanteen" },
      { property: "og:description", content: "Log in to eCanteen to make your order." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginScreen,
});