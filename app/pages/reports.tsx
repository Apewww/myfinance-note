import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getTransactions } from "../services/transactionService";
import { motion } from "framer-motion";
import { BarChart3, LayoutGrid, ArrowRight, Wallet, Activity } from "lucide-react";
import { cn } from "../utils/cn";
import { formatCurrency } from "../utils/format";

export function ReportsContent() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState<'monthly' | 'yearly'>('monthly');

  useEffect(() => {
    getTransactions().then(txs => {
      setData(txs);
      setLoading(false);
    });
  }, []);

  const monthlyStats = data.reduce((acc: any, curr: any) => {
    const dateObj = new Date(curr.date);
    const label = timeframe === 'monthly'
      ? dateObj.toLocaleString('default', { month: 'long', year: 'numeric' })
      : dateObj.getFullYear().toString();

    if (!acc[label]) acc[label] = { income: 0, expense: 0, categories: {} };
    if (curr.type === 'income') acc[label].income += curr.amount;
    else {
      acc[label].expense += curr.amount;
      const catName = curr.categories?.name || 'Uncategorized';
      acc[label].categories[catName] = (acc[label].categories[catName] || 0) + curr.amount;
    }
    return acc;
  }, {});

  const sortedLabels = Object.keys(monthlyStats).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  const currentLabel = sortedLabels[sortedLabels.length - 1];
  const currentStats = monthlyStats[currentLabel] || { income: 0, expense: 0, categories: {} };

  const topCategories = Object.entries(currentStats.categories as Record<string, number>)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <DashboardLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Financial Reports</h1>
            <p className="text-white/40">In-depth analysis of your financial patterns.</p>
          </div>
          <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
            <button onClick={() => setTimeframe('monthly')} className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all", timeframe === 'monthly' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "text-white/40 hover:text-white/70")}>Monthly</button>
            <button onClick={() => setTimeframe('yearly')} className={cn("px-6 py-2 rounded-xl text-sm font-bold transition-all", timeframe === 'yearly' ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30" : "text-white/40 hover:text-white/70")}>Yearly</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-8 md:p-10 min-h-[500px] flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 rounded-full -mr-48 -mt-48 blur-[100px] group-hover:bg-cyan-600/10 transition-all duration-700" />

              <div className="flex items-center justify-between mb-12">
                <div>
                  <h3 className="text-2xl font-black text-white flex items-center gap-3">
                    <Activity className="w-6 h-6 text-cyan-400" />
                    Cash Flow Trend
                  </h3>
                  <p className="text-white/30 text-xs mt-1 font-medium tracking-widest uppercase">Performance Index</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" /><span className="text-xs font-bold text-white/50">Income</span></div>
                  <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.5)]" /><span className="text-xs font-bold text-white/50">Expense</span></div>
                </div>
              </div>

              <div className="flex-1 flex items-end justify-between gap-4 md:gap-8 px-2 pb-8">
                {sortedLabels.slice(-6).map((label) => {
                  const maxVal = 20000000;
                  const incH = Math.min((monthlyStats[label].income / maxVal) * 100, 100);
                  const expH = Math.min((monthlyStats[label].expense / maxVal) * 100, 100);
                  return (
                    <div key={label} className="flex-1 flex flex-col items-center gap-5 group/bar">
                      <div className="w-full h-72 flex items-end justify-center gap-2 md:gap-3 relative">
                        <div className="absolute inset-0 bg-white/[0.02] rounded-2xl -m-2 opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                        <div className="relative w-3 md:w-5 h-full flex flex-col justify-end">
                          <motion.div initial={{ height: 0 }} animate={{ height: `${incH}%` }} className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg md:rounded-t-xl transition-all" />
                        </div>
                        <div className="relative w-3 md:w-5 h-full flex flex-col justify-end">
                          <motion.div initial={{ height: 0 }} animate={{ height: `${expH}%` }} className="w-full bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg md:rounded-t-xl transition-all" />
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-white/20 group-hover/bar:text-white/60 transition-colors uppercase tracking-[0.2em]">{label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[32px] p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                <h4 className="text-white font-bold mb-8 flex items-center gap-2 tracking-tight text-lg">
                  <Wallet className="w-5 h-5 text-rose-500" />
                  Top Spending
                </h4>
                <div className="space-y-6">
                  {topCategories.length > 0 ? topCategories.map(([cat, amount], i) => (
                    <div key={cat} className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/60 font-semibold">{cat}</span>
                        <span className="text-white font-black">{formatCurrency(amount as number).replace(/Rp\s?/, '')}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${((amount as number) / currentStats.expense) * 100}%` }} className={cn("h-full rounded-full", i === 0 ? "bg-rose-500" : i === 1 ? "bg-orange-500" : "bg-sky-500")} />
                      </div>
                    </div>
                  )) : <p className="text-white/20 italic text-sm text-center py-10">Accumulating data...</p>}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-black text-white px-2 flex items-center gap-2">History <div className="h-px flex-1 bg-white/5" /></h2>
            <div className="space-y-4">
              {sortedLabels.slice(-4).reverse().map((label) => (
                <div key={label} className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 transition-transform hover:scale-[1.02] cursor-default border-l-4 border-l-cyan-500/20">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label.split(' ')[1]}</p>
                  <p className="text-white font-black text-lg mb-4">{label.split(' ')[0]}</p>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold"><span className="text-white/30 uppercase tracking-wider">In</span><span className="text-emerald-400">{formatCurrency(monthlyStats[label].income).replace(/Rp\s?/, '')}</span></div>
                    <div className="flex justify-between text-xs font-bold"><span className="text-white/30 uppercase tracking-wider">Out</span><span className="text-rose-400">{formatCurrency(monthlyStats[label].expense).replace(/Rp\s?/, '')}</span></div>
                    <div className="pt-3 border-t border-white/5 flex justify-between items-center"><span className="text-white/40 text-xs font-bold">Net</span><span className="text-white font-black text-lg tracking-tighter">{formatCurrency(monthlyStats[label].income - monthlyStats[label].expense).replace(/Rp\s?/, '')}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
