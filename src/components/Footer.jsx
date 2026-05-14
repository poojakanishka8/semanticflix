import { PlayCircle, Globe, Mail, MessageCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface pt-16 pb-8 border-t border-white/5 mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <PlayCircle className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Semantic<span className="text-primary">Flix</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Your premium destination for AI-powered movie recommendations. Discover, save, and enjoy cinematic masterpieces tailored just for you.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Info className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-white transition-colors">Search</Link></li>
              <li><Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">My Favorites</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Help & Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to get latest updates on new releases.</p>
            <div className="flex bg-white/5 rounded-md overflow-hidden p-1 border border-white/10 focus-within:border-primary transition-colors">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent text-white px-4 py-2 w-full outline-none text-sm"
              />
              <button className="bg-primary hover:bg-accent text-white px-4 py-2 rounded font-medium text-sm transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SemanticFlix. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>Powered by AI</span>
            <span>•</span>
            <span>Premium UI</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
