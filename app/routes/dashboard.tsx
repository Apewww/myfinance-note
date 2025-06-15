import type { Route } from "./+types/login";
import { DashboardContent as DashboardComponent } from "../pages/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Dashboard" },
    { name: "description", content: "Dashboard Page" },
  ];
}

export default function DashboardPage() {
  return <DashboardComponent />;
}
