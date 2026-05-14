import { useState, useEffect } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../components/MovieCard';
import { useStore } from '../store/useStore';

export default function Search() {
  const { movies, fetchMovies } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(lowercaseQuery) || 
      movie.genre.toLowerCase().includes(lowercaseQuery)
    );
    setResults(filtered);
  }, [query, movies]);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Search Bar */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon className="h-6 w-6 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full bg-surface/50 border border-white/10 rounded-full py-4 pl-14 pr-12 text-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-glass"
            placeholder="Search for movies, genres, or keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Search Results Summary */}
        {query && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">
              {results.length > 0 
                ? `Found ${results.length} results for "${query}"` 
                : `No results found for "${query}"`}
            </h2>
          </div>
        )}

        {/* Results Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          <AnimatePresence>
            {results.map((movie, idx) => (
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

        {/* Initial State / Suggestions */}
        {!query && (
          <div className="text-center py-20 opacity-50">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <p className="text-xl text-gray-400">Start typing to search our premium catalog.</p>
          </div>
        )}

      </div>
    </div>
  );
}
