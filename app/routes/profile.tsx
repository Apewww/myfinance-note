import type { Route } from "./+types/profile";
import { ProfileContent } from "../pages/profile";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MyFinance - User Profile" },
    { name: "description", content: "User Profile Settings" },
  ];
}

export default function ProfilePage() {
  return <ProfileContent />;
}
