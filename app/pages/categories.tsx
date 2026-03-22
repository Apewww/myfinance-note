import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getCategories, addCategory } from "../services/categoryService";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Tags, Trash2, X, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../utils/cn";

export function CategoriesContent() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [type, setType] = useState<'income' | 'expense'>('expense');

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    setLoading(true);
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error loading categories", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCategory(name, type);
      setIsModalOpen(false);
      setName("");
      loadCategories();
    } catch (error) {
      alert("Failed to add category");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Categories</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            New Category
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Expenses */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-rose-400 flex items-center gap-2 px-2">
              <TrendingDown className="w-5 h-5" />
              Expense Categories
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 min-h-[200px]">
              {loading ? (
                <div className="flex justify-center p-10"><div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {categories.filter(c => c.type === 'expense').map(cat => (
                    <div key={cat.id} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/80 flex items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Income */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2 px-2">
              <TrendingUp className="w-5 h-5" />
              Income Categories
            </h2>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 min-h-[200px]">
              {loading ? (
                <div className="flex justify-center p-10"><div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {categories.filter(c => c.type === 'income').map(cat => (
                    <div key={cat.id} className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/80 flex items-center gap-3 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
                      <span className="font-medium">{cat.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 z-[70]">
              <h2 className="text-2xl font-bold text-white mb-6">Add Category</h2>
              <form onSubmit={handleAddCategory} className="space-y-6">
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                  <button type="button" onClick={() => setType('expense')} className={cn("flex-1 py-3 rounded-lg font-bold text-sm", type === 'expense' ? "bg-rose-500 text-white" : "text-white/50")}>Expense</button>
                  <button type="button" onClick={() => setType('income')} className={cn("flex-1 py-3 rounded-lg font-bold text-sm", type === 'income' ? "bg-emerald-500 text-white" : "text-white/50")}>Income</button>
                </div>
                <input type="text" placeholder="Category Name (e.g. Food, Salary)" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" value={name} onChange={(e) => setName(e.target.value)} required />
                <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all">Create Category</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
