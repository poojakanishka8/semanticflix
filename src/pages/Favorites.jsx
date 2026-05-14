import { motion, AnimatePresence } from 'framer-motion';
import { HeartCrack } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useStore } from '../store/useStore';

export default function Favorites() {
  const { favorites } = useStore();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">My Wishlist</h1>
          <p className="text-gray-400">Your personalized collection of premium cinematic experiences.</p>
        </motion.div>

        {favorites.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            <AnimatePresence>
              {favorites.map((movie, idx) => (
                <motion.div
                  key={movie.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <MovieCard movie={movie} index={0} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-surface flex items-center justify-center mb-6 shadow-glass">
              <HeartCrack className="w-10 h-10 text-gray-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Looks like you haven't added any movies to your favorites yet. Explore our catalog and start building your collection.
            </p>
            <Link 
              to="/categories"
              className="bg-primary hover:bg-accent text-white px-8 py-3 rounded-full font-bold transition-all shadow-neon hover:scale-105"
            >
              Explore Movies
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
