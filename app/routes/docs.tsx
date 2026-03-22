import type { Route } from "./+types/docs";
import DocsContent from "../pages/docs";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Documentation | MyFinance" },
    { name: "description", content: "Technical details and credits for MyFinance." },
  ];
}

export default function Docs() {
  return <DocsContent />;
}
