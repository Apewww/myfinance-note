import type { Route } from "./+types/categories";
import { CategoriesContent } from "../pages/categories";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Categories" },
    { name: "description", content: "Manage Categories" },
  ];
}

export default function CategoriesPage() {
  return <CategoriesContent />;
}
