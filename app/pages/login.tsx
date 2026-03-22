import { useState, useEffect } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { cn } from "../utils/cn";

export function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-12">
                <LogIn className="text-white w-8 h-8 -rotate-12" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white text-center mb-2">MyFinance</h2>
            <p className="text-indigo-200 text-center mb-8">Welcome back! Please login to your account.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-200 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-indigo-200">Password</label>
                  <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-cyan-400 transition-colors" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-center gap-3 text-red-200 text-sm"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-[0.98]",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-8 text-center text-indigo-200 text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">Register here</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
