import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { useStore } from '../store/useStore';

export default function Home() {
  const { movies, genres, fetchMovies, isLoading, openVideo } = useStore();
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    if (movies.length > 0) {
      const random = Math.floor(Math.random() * movies.length);
      setFeaturedMovie(movies[random]);
    }
  }, [movies]);

  if (isLoading || !featuredMovie) {
    return <div className="min-h-screen flex items-center justify-center text-white">Loading Movies...</div>;
  }

  const trendingMovies = movies.slice(0, 4);
  const topRated = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const aiRecommendations = movies.slice(4, 8);

  const SectionTitle = ({ children, icon: Icon }) => (
    <div className="flex items-center gap-3 mb-8">
      {Icon && <Icon className="w-6 h-6 text-primary" />}
      <h2 className="text-2xl md:text-3xl font-bold text-white">{children}</h2>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center">
        {/* Background Image with Cinematic Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredMovie.banner} 
            alt={featuredMovie.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-white/10 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-md border border-white/20">
                {featuredMovie.year}
              </span>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/30">
                {featuredMovie.genre}
              </span>
              <span className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium border border-yellow-400/30 flex items-center gap-1">
                ★ {featuredMovie.rating}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight text-shadow">
              {featuredMovie.title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl leading-relaxed text-shadow">
              {featuredMovie.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => openVideo(featuredMovie)}
                className="flex items-center gap-2 bg-primary hover:bg-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-neon"
              >
                <Play className="w-5 h-5 fill-white" />
                Watch Now
              </button>
              <Link 
                to={`/movie/${featuredMovie.id}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-md transition-all hover:scale-105 border border-white/10"
              >
                <Info className="w-5 h-5" />
                More Info
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-4 md:px-8 py-12 space-y-20 relative z-20 -mt-20">
        
        {/* Trending Section */}
        <section>
          <SectionTitle>Trending Now</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingMovies.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} index={idx} />
            ))}
          </div>
        </section>

        {/* AI Recommendations */}
        <section className="bg-surface/40 p-8 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <SectionTitle icon={Sparkles}>AI Selected For You</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
            {aiRecommendations.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} index={idx} />
            ))}
          </div>
        </section>

        {/* Popular Genres */}
        <section>
          <SectionTitle>Popular Genres</SectionTitle>
          <div className="flex flex-wrap gap-4">
            {genres.map((genre, idx) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                key={genre}
              >
                <Link
                  to={`/categories?genre=${genre}`}
                  className="block px-8 py-4 bg-surface hover:bg-white/10 rounded-xl font-semibold text-lg transition-all border border-white/5 hover:border-primary/50 hover:shadow-neon"
                >
                  {genre}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <SectionTitle>Top Rated on IMDb</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {topRated.map((movie, idx) => (
              <MovieCard key={movie.id} movie={movie} index={idx} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
