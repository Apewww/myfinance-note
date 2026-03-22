import { useEffect, useState } from "react";
import { DashboardLayout } from "../layout/DashboardLayout";
import { getSession } from "../services/authService";
import { motion } from "framer-motion";
import { User, Mail, Shield, Smartphone, Globe, Bell } from "lucide-react";
import { cn } from "../utils/cn";

export function ProfileContent() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getSession().then(session => setUser(session?.user));
  }, []);

  const ProfileItem = ({ icon: Icon, label, value }: any) => (
    <div className="flex items-center gap-4 p-4 hover:bg-white/[0.02] rounded-2xl transition-all">
      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-cyan-400">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{label}</p>
        <p className="text-white font-bold">{value || 'Not set'}</p>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="flex flex-col items-center text-center space-y-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/20"
          >
            <User className="w-16 h-16 text-white" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-white">{user?.email?.split('@')[0] || 'User'}</h1>
            <p className="text-white/50">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white px-2">Account Discovery</h2>
            <div className="space-y-2">
              <ProfileItem icon={Mail} label="Email Address" value={user?.email} />
              <ProfileItem icon={Shield} label="Account Status" value="Verified User" />
              <ProfileItem icon={Smartphone} label="Connected Phone" value="none" />
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white px-2">Preferences</h2>
            <div className="space-y-2">
              <ProfileItem icon={Globe} label="Region / Language" value="English (US)" />
              <ProfileItem icon={Bell} label="Notifications" value="Enabled" />
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl">
                <p className="text-cyan-400 text-sm font-bold mb-1">PWA Status</p>
                <p className="text-white/60 text-xs">Installed on this device</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-rose-500/10 border border-rose-500/20 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Danger Zone</h3>
          <p className="text-white/50 text-sm">Deleting your account is permanent and cannot be undone.</p>
          <button className="bg-rose-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-rose-600 transition-all active:scale-95 shadow-lg shadow-rose-500/20">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
