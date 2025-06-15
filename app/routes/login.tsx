import type { Route } from "./+types/login";
import { LoginContent as LoginComponent } from "../pages/login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - Login" },
    { name: "description", content: "Login Page" },
  ];
}

export default function LoginPage() {
  return <LoginComponent />;
}
