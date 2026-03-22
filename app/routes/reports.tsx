import type { Route } from "./+types/reports";
import { ReportsContent } from "../pages/reports";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Reports" },
    { name: "description", content: "Financial Reports" },
  ];
}

export default function ReportsPage() {
  return <ReportsContent />;
}
