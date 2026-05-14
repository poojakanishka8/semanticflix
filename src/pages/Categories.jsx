import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { MOVIES, GENRES } from '../data/movies';

export default function Categories() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialGenre = searchParams.get('genre') || 'All';
  const [activeGenre, setActiveGenre] = useState(initialGenre);
  const [filteredMovies, setFilteredMovies] = useState(MOVIES);

  useEffect(() => {
    setActiveGenre(searchParams.get('genre') || 'All');
  }, [searchParams]);

  useEffect(() => {
    if (activeGenre === 'All') {
      setFilteredMovies(MOVIES);
    } else {
      setFilteredMovies(MOVIES.filter(movie => movie.genre === activeGenre));
    }
  }, [activeGenre]);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
    if (genre === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ genre });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Explore Categories</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">Discover movies across various genres. From heart-pounding action to side-splitting comedy.</p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => handleGenreClick('All')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeGenre === 'All' 
                ? 'bg-primary text-white shadow-neon' 
                : 'bg-surface text-gray-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            All Movies
          </button>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreClick(genre)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeGenre === genre 
                  ? 'bg-primary text-white shadow-neon' 
                  : 'bg-surface text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movie Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence>
            {filteredMovies.map((movie, idx) => (
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

        {filteredMovies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500">No movies found in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
