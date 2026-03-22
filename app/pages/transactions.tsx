import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getTransactions, addTransaction, deleteTransaction } from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Trash2, 
  ChevronDown, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  X
} from "lucide-react";
import { cn } from "../utils/cn";
import { formatCurrency, formatNumber, parseNumber } from "../utils/format";

export function TransactionsContent() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [txs, cats] = await Promise.all([
        getTransactions(),
        getCategories()
      ]);
      setTransactions(txs);
      setCategories(cats);
    } catch (error) {
      console.error("Error loading transactions", error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTransaction({
        amount: parseNumber(amount),
        description,
        category_id: categoryId,
        type,
        date
      });
      setIsModalOpen(false);
      resetForm();
      loadData();
    } catch (error) {
      alert("Failed to add transaction");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction(id);
        loadData();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setCategoryId("");
    setType('expense');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h1 className="text-3xl font-bold text-white">Transactions</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Add New
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="p-20 flex justify-center"><div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-white/50 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Details</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", tx.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>
                            {tx.type === 'income' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-white mb-0.5">{tx.description || 'No description'}</p>
                            <p className="text-white/40 text-xs capitalize">{tx.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5"><span className="bg-white/5 border border-white/10 text-white/60 text-xs font-medium px-3 py-1 rounded-full">{tx.categories?.name}</span></td>
                      <td className="px-6 py-5"><div className="flex items-center gap-2 text-white/50 text-sm"><Calendar className="w-4 h-4" />{new Date(tx.date).toLocaleDateString('id-ID')}</div></td>
                      <td className="px-6 py-5 text-right font-bold text-white"><span className={tx.type === 'income' ? "text-emerald-400" : ""}>{tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount).replace(/Rp\s?/, '')}</span></td>
                      <td className="px-6 py-5 text-right"><button onClick={() => handleDelete(tx.id)} className="p-2 text-white/20 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"><Trash2 className="w-5 h-5" /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-20 text-center text-white/30 italic">No transactions found.</div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 z-[70] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Add Transaction</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddTransaction} className="space-y-6">
                <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                  <button type="button" onClick={() => setType('expense')} className={cn("flex-1 py-3 rounded-lg font-bold text-sm", type === 'expense' ? "bg-rose-500 text-white" : "text-white/50")}>Expense</button>
                  <button type="button" onClick={() => setType('income')} className={cn("flex-1 py-3 rounded-lg font-bold text-sm", type === 'income' ? "bg-emerald-500 text-white" : "text-white/50")}>Income</button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/50 ml-1">Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 font-bold text-2xl">Rp</span>
                    <input type="text" required placeholder="0" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-4 text-3xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" value={formatNumber(amount)} onChange={(e) => setAmount(e.target.value.replace(/\./g, ''))} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/50 ml-1">Category</label>
                    <select required className="w-full bg-white/10 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 appearance-none" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                      <option value="" className="bg-[#0f0f0f] text-white/50">Select...</option>
                      {categories.filter(c => c.type === type).map(c => <option key={c.id} value={c.id} className="bg-[#0f0f0f] text-white">{c.name}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/50 ml-1">Date</label>
                    <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
                <input type="text" placeholder="Description" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-2xl">Save Transaction</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}
