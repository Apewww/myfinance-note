import { DashboardLayout } from "../layout/DashboardLayout";
import { motion } from "framer-motion";
import { Book, Cpu, User, Heart, Star, Code2, Rocket } from "lucide-react";

export default function DocumentationPage() {
  const credits = [
    {
      name: "The User",
      role: "Visionary & Product Owner",
      description: "Provided the initial project vision, requirements, and refined the UI/UX through iterative feedback.",
      icon: User,
      color: "bg-emerald-500"
    },
    {
      name: "Antigravity",
      role: "Lead Developer (AI Agent)",
      description: "An AI coding assistant that architected, implemented, and refined the entire codebase and PWA configuration.",
      icon: Cpu,
      color: "bg-cyan-500"
    },
    {
      name: "Google Gemini",
      role: "Underlying LLM",
      description: "The powerful language model that enables complex reasoning and code generation for this project.",
      icon: Star,
      color: "bg-purple-500"
    }
  ];

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-16 pb-20">
        <div className="text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-bold tracking-widest uppercase mb-4"
          >
            <Book className="w-4 h-4" />
            Project Documentation
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Technical Overview</h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">Learn how MyFinance works under the hood and meet the team that built it.</p>
        </div>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Rocket className="w-6 h-6 text-cyan-400" />
            Architecture & Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Frontend Core</h3>
              <p className="text-white/50 text-sm leading-relaxed">Built with **React Router 7 (Vite)**, focusing on a Single Page Application (SPA) experience with SSR capabilities. The UI uses **Tailwind CSS** and **DaisyUI** for a premium glassmorphic feel.</p>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 space-y-4">
              <h3 className="text-lg font-bold text-white">Backend (Supabase)</h3>
              <p className="text-white/50 text-sm leading-relaxed">Leverages **PostgreSQL** with **Row Level Security (RLS)** to ensure data privacy. Transactions and categories are managed in real-time through the Supabase Client SDK.</p>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Heart className="w-6 h-6 text-rose-400" />
            Development Credits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {credits.map((c, i) => (
              <motion.div 
                key={c.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${c.color} opacity-5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:opacity-10 transition-opacity`} />
                <div className={`w-12 h-12 ${c.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                  <c.icon className={`w-6 h-6 ${c.color.replace('bg-', 'text-')}`} />
                </div>
                <h3 className="text-white font-bold mb-1">{c.name}</h3>
                <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-3">{c.role}</p>
                <p className="text-white/40 text-xs leading-relaxed">{c.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-br from-cyan-600/20 to-blue-800/20 border border-white/10 rounded-[40px] p-10 text-center space-y-6">
          <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Code2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-black text-white">Iterative Development</h2>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            This project is a testament to the power of pair programming between humans and AI. 
            Through many iterations of refactoring, UI enhancements, and feature implementation, we have built a fully functional PWA that rivals professional fintech applications.
          </p>
        </section>
      </div>
    </DashboardLayout>
  );
}
