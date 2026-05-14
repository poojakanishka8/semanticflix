import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Play } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function MovieCard({ movie, index = 0 }) {
  const { favorites, addFavorite, removeFavorite } = useStore();
  const isFav = favorites.some((f) => f.id === movie.id);

  const toggleFavorite = (e) => {
    e.preventDefault(); // Prevent navigating to movie details
    if (isFav) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer aspect-[2/3] shadow-glass bg-surface transform transition-transform duration-300 hover:scale-105 hover:shadow-neon"
    >
      <Link to={`/movie/${movie.id}`} className="block w-full h-full">
        {/* Poster Image */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-semibold text-yellow-400">
            <Star className="w-4 h-4 fill-yellow-400" />
            {movie.rating}
          </div>
          <button
            onClick={toggleFavorite}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-primary/80 transition-colors"
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-primary text-primary' : ''}`} />
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 z-10">
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{movie.title}</h3>
          
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            <span className="px-2 py-0.5 border border-white/20 rounded-sm">{movie.year}</span>
            <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-sm">{movie.genre}</span>
            <span>{movie.duration}</span>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            <button className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-accent text-white py-2 rounded-md font-semibold text-sm transition-colors">
              <Play className="w-4 h-4 fill-white" />
              Watch Now
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
