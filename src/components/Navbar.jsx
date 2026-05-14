import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, User, Menu, X, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/categories' },
    { name: 'Favorites', path: '/favorites' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-background/90 backdrop-blur-md shadow-glass py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <PlayCircle className="w-8 h-8 text-primary group-hover:animate-spin" />
            <span className="text-2xl font-bold tracking-tight text-white">
              Semantic<span className="text-primary">Flix</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors hover:text-white ${
                      isActive(link.path) ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <Link to="/search" className="text-gray-400 hover:text-white transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
              <Link
                to="/profile"
                className="hidden lg:block bg-primary/10 hover:bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm font-bold border border-primary/20 transition-all"
              >
                Subscribe
              </Link>
              <Link to="/profile" className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-purple-600 p-0.5 cursor-pointer">
                <div className="w-full h-full bg-surface rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 flex flex-col md:hidden"
          >
            <ul className="flex flex-col gap-6 text-xl font-semibold mb-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`${isActive(link.path) ? 'text-primary' : 'text-white'}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-6 border-t border-white/10 pt-6">
              <Link to="/search" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-gray-300">
                <Search className="w-6 h-6" /> Search
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
