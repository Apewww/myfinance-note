import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { logout, getSession } from "../services/authService";
import { 
  LayoutDashboard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Tags, 
  User, 
  LogOut, 
  Menu, 
  X,
  Wallet,
  BarChart3,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../utils/cn";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then(session => {
      if (!session) navigate("/");
      else setUser(session.user);
    });
  }, [navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: Wallet },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Categories", href: "/categories", icon: Tags },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Documentation", href: "/docs", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a0a0a] border-r border-white/5 p-6 space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            MyFinance
          </span>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-white/10 text-cyan-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" 
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header Mobile */}
        <header className="lg:hidden h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
            <Wallet className="w-6 h-6 text-cyan-400" />
            <span className="font-bold">MyFinance</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-white/50 hover:text-white">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#050505] p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-[#0a0a0a] z-50 p-6 flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Wallet className="w-6 h-6 text-cyan-400" />
                  <span className="text-xl font-bold">MyFinance</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-white/50 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-4 py-4 rounded-xl transition-all",
                      isActive ? "bg-white/10 text-cyan-400" : "text-white/50"
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="text-lg font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-4 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-all border-t border-white/5 mt-auto"
              >
                <LogOut className="w-6 h-6" />
                <span className="text-lg font-medium">Logout</span>
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}