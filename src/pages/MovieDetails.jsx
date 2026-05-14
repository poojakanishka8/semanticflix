import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plus, Check, Star, Calendar, Clock, Film } from 'lucide-react';
import MovieCard from '../components/MovieCard';
import { useStore } from '../store/useStore';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { favorites, addFavorite, removeFavorite, movies, fetchMovies, openVideo } = useStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length > 0) {
      const foundMovie = movies.find(m => m.id === parseInt(id));
      setMovie(foundMovie);
      window.scrollTo(0, 0);
    }
  }, [id, movies]);

  if (!movie) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  const isFav = favorites.some(f => f.id === movie.id);
  const similarMovies = movies.filter(m => m.genre === movie.genre && m.id !== movie.id).slice(0, 4);

  const toggleFavorite = () => {
    if (isFav) removeFavorite(movie.id);
    else addFavorite(movie);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative h-[70vh] w-full">
        <div className="absolute inset-0">
          <img src={movie.banner} alt={movie.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 h-full flex items-end pb-20">
          <div className="flex flex-col md:flex-row gap-8 items-end max-w-5xl">
            {/* Poster */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:block w-64 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0"
            >
              <img src={movie.poster} alt={movie.title} className="w-full h-auto" />
            </motion.div>

            {/* Info */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow">{movie.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-300 mb-6">
                <span className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <Star className="w-5 h-5 fill-yellow-400" /> {movie.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {movie.year}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {movie.duration}
                </span>
                <span className="flex items-center gap-1 px-3 py-1 bg-white/10 rounded-full border border-white/20">
                  <Film className="w-4 h-4" /> {movie.genre}
                </span>
              </div>

              <p className="text-lg text-gray-300 mb-8 max-w-3xl leading-relaxed text-shadow">
                {movie.description}
              </p>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => openVideo(movie)}
                  className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-3 rounded-md font-bold transition-all hover:scale-105 shadow-neon"
                >
                  <Play className="w-5 h-5 fill-white" /> Play Trailer
                </button>
                <button 
                  onClick={toggleFavorite}
                  className="flex items-center gap-2 bg-surface hover:bg-white/10 border border-white/20 text-white px-6 py-3 rounded-md font-semibold transition-all"
                >
                  {isFav ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  {isFav ? 'Added to List' : 'My List'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cast Section (Dummy Data) */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Top Cast</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="flex flex-col items-center gap-3 min-w-[120px]">
              <div className="w-24 h-24 rounded-full bg-surface overflow-hidden border-2 border-white/10">
                <img 
                  src={`https://i.pravatar.cc/150?img=${i + 10}`} 
                  alt="Actor" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <span className="text-white font-medium text-sm text-center">Actor Name</span>
              <span className="text-gray-500 text-xs text-center">Character</span>
            </div>
          ))}
        </div>
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 md:px-8 py-12 border-t border-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {similarMovies.map((m, idx) => (
              <MovieCard key={m.id} movie={m} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
