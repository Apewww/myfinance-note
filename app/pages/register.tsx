import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "../utils/cn";

export function RegisterContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => navigate("/"), 3000);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
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
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-12">
                <UserPlus className="text-white w-8 h-8 rotate-12" />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-white text-center mb-2">Create Account</h2>
            <p className="text-indigo-200 text-center mb-8">Join MyFinance and start tracking your wealth.</p>

            {success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-8 text-center space-y-4"
              >
                <div className="flex justify-center">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Registration Successful!</h3>
                <p className="text-indigo-200">Check your email for confirmation. Redirecting to login...</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 ml-1">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 ml-1">Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-300 group-focus-within:text-emerald-400 transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-indigo-300/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                    "w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all transform active:scale-[0.98]",
                    loading && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>
            )}

            {!success && (
              <div className="mt-8 text-center text-indigo-200 text-sm">
                Already have an account?{" "}
                <Link to="/" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">Login here</Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
