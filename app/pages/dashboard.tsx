import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getBalanceSummary, getTransactions, addTransaction } from "../services/transactionService";
import { getCategories } from "../services/categoryService";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Plus, 
  ArrowRight,
  Clock,
  CircleDollarSign,
  X
} from "lucide-react";
import { cn } from "../utils/cn";
import { formatCurrency, formatNumber, parseNumber } from "../utils/format";
import { Link } from "react-router";

export function DashboardContent() {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [sum, txs, cats] = await Promise.all([
        getBalanceSummary(),
        getTransactions(),
        getCategories()
      ]);
      setSummary(sum);
      setRecentTransactions(txs.slice(0, 5));
      setCategories(cats);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  }

  const openAddModal = (mode: 'income' | 'expense') => {
    setType(mode);
    setIsModalOpen(true);
  };

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

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setCategoryId("");
    setDate(new Date().toISOString().split('T')[0]);
  };

  const StatCard = ({ title, amount, icon: Icon, color, delay }: any) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 relative overflow-hidden group"
    >
      <div className={cn("absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full -mr-16 -mt-16 blur-2xl transition-all group-hover:opacity-20", color)} />
      <div className="flex justify-between items-start mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", color.replace('bg-', 'bg-opacity-20 bg-').replace('blur', ''))}>
          <Icon className={cn("w-6 h-6", color.replace('bg-', 'text-'))} />
        </div>
      </div>
      <div>
        <p className="text-white/50 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          {formatCurrency(amount)}
        </h3>
      </div>
    </motion.div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Financial Overview</h1>
            <p className="text-white/50">Track your spending and manage your wealth effectively.</p>
          </div>
          <button 
            onClick={() => openAddModal('expense')}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Balance" amount={summary.balance} icon={Wallet} color="bg-cyan-500" delay={0.1} />
          <StatCard title="Total Income" amount={summary.income} icon={TrendingUp} color="bg-emerald-500" delay={0.2} />
          <StatCard title="Total Expenses" amount={summary.expense} icon={TrendingDown} color="bg-rose-500" delay={0.3} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Clock className="w-5 h-5 text-cyan-400" />Recent Transactions</h2>
              <Link to="/transactions" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 font-medium">View All<ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              {loading ? (
                <div className="p-10 flex justify-center"><div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" /></div>
              ) : recentTransactions.length > 0 ? (
                <div className="divide-y divide-white/5">
                  {recentTransactions.map((tx, i) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * i }} key={tx.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", tx.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400")}>{tx.type === 'income' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}</div>
                        <div>
                          <p className="text-white font-medium mb-0.5">{tx.description || tx.categories?.name}</p>
                          <p className="text-white/40 text-xs flex items-center gap-1.5"><span className="capitalize">{tx.categories?.name}</span><span className="w-1 h-1 rounded-full bg-white/20" />{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={cn("font-bold text-lg", tx.type === 'income' ? "text-emerald-400" : "text-white")}>{tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount).replace(/Rp\s?/, '')}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-10 text-center text-white/40 italic">No recent transactions found.</div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white px-2">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => openAddModal('income')}
                className="bg-[#0a0a0a] border border-white/5 hover:bg-white/5 hover:border-white/10 p-6 rounded-3xl flex flex-col items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-6 h-6" /></div>
                <span className="text-sm font-medium text-white/70">Add Income</span>
              </button>
              <button 
                onClick={() => openAddModal('expense')}
                className="bg-[#0a0a0a] border border-white/5 hover:bg-white/5 hover:border-white/10 p-6 rounded-3xl flex flex-col items-center gap-4 transition-all group"
              >
                <div className="w-12 h-12 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Plus className="w-6 h-6" /></div>
                <span className="text-sm font-medium text-white/70">Add Expense</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]" />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-[#0f0f0f] border border-white/10 rounded-3xl p-8 z-[70] shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white">Add {type === 'income' ? 'Income' : 'Expense'}</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleAddTransaction} className="space-y-6">
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
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/50 ml-1">Description</label>
                  <input type="text" placeholder="What was this for?" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl transition-all active:scale-[0.98] mt-4">Save {type === 'income' ? 'Income' : 'Expense'}</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}