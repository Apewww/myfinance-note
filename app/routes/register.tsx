import type { Route } from "./+types/register";
import { RegisterContent as RegisterComponent } from "../pages/register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Register" },
    { name: "description", content: "Register Page" },
  ];
}

export default function RegisterPage() {
  return <RegisterComponent />;
}
