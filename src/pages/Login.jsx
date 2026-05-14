import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Mail, Lock, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, error } = useStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      const success = await login(email, password);
      if (success) {
        navigate('/');
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/login_bg/2000/1000" 
          alt="Cinematic Background" 
          className="w-full h-full object-cover opacity-40 scale-105 animate-float"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-panel p-10 rounded-2xl shadow-neon border border-white/10 text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 shadow-neon">
              <PlayCircle className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
            Semantic<span className="text-primary">Flix</span>
          </h1>
          <p className="text-gray-400 mb-8 font-medium">Step into the cinematic universe.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                required
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                required
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <button 
              type="submit"
              className="w-full group relative flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-neon mt-4"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-400">
            <p>New to SemanticFlix? <a href="#" className="text-white hover:text-primary transition-colors font-semibold">Sign up now</a>.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
