import { motion, AnimatePresence } from 'framer-motion';
import { X, User, LogOut, Settings, CreditCard, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';

export default function Profile() {
  const { user, logout, isLoggedIn } = useStore();
  const [isOpen, setIsOpen] = [false, () => {}]; // We'll manage this via store or local state

  // This is a modal component, but we can make it a full page or a dropdown.
  // Let's create a dedicated Profile page instead for better UX.

  return (
    <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Account Settings</h1>
          <p className="text-gray-400">Manage your profile and subscription</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between px-4 py-3 bg-primary/10 text-primary rounded-xl font-medium border border-primary/20">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5" /> Profile
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5" /> Subscription
              </div>
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" /> Settings
              </div>
            </button>
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" /> Sign Out
              </div>
            </button>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Profile Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-0.5">
                    <div className="w-full h-full bg-surface rounded-full flex items-center justify-center text-3xl text-white uppercase font-bold">
                      {user?.name?.[0] || 'U'}
                    </div>
                  </div>
                  <div>
                    <button className="text-sm font-semibold text-primary hover:text-accent transition-colors">Change Avatar</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Full Name</label>
                    <input type="text" readOnly value={user?.name || 'Semantic User'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">Email Address</label>
                    <input type="text" readOnly value={user?.email || 'user@example.com'} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 to-transparent">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Premium Subscription</h3>
                  <p className="text-gray-400 text-sm">Your plan expires on Dec 31, 2026</p>
                </div>
                <button className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-xl font-bold transition-all shadow-neon">
                  Manage Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
