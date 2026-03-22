import { type RouteConfig, index, route } from "@react-router/dev/routes";

// function requireAuth() {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     throw redirect("/login");
//   }
// }

// function redirectIfLoggedIn() {
//   const token = localStorage.getItem("token");
//   if (token) {
//     throw redirect("/dashboard");
//   }
// }

export default [
    index("routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("dashboard", "routes/dashboard.tsx"),
    route("transactions", "routes/transactions.tsx"),
    route("categories", "routes/categories.tsx"),
    route("profile", "routes/profile.tsx"),
    route("reports", "routes/reports.tsx")
] satisfies RouteConfig;
