import type { Route } from "./+types/transactions";
import { TransactionsContent } from "../pages/transactions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Transactions" },
    { name: "description", content: "Manage Transactions" },
  ];
}

export default function TransactionsPage() {
  return <TransactionsContent />;
}
