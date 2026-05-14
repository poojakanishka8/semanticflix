import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      isLoggedIn: false,
      token: null,
      user: null,
      movies: [],
      genres: [],
      isLoading: false,
      error: null,

      login: async (email, password) => {
        try {
          const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });
          const data = await response.json();
          
          if (response.ok) {
            set({ isLoggedIn: true, token: data.token, user: data.user, error: null });
            return true;
          } else {
            set({ error: data.error });
            return false;
          }
        } catch (error) {
          set({ error: 'Failed to connect to server' });
          return false;
        }
      },

      logout: () => set({ isLoggedIn: false, token: null, user: null, favorites: [] }),

      fetchMovies: async () => {
        const state = get();
        if (state.movies.length > 0) return; // Don't fetch if we already have them

        set({ isLoading: true });
        try {
          const response = await fetch('http://localhost:5000/api/movies');
          const data = await response.json();
          if (response.ok) {
            set({ movies: data.movies, genres: data.genres, isLoading: false });
          } else {
            set({ error: 'Failed to fetch movies', isLoading: false });
          }
        } catch (error) {
          set({ error: 'Failed to connect to server', isLoading: false });
        }
      },

      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),

      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
        
      isFavorite: (movieId) => {
        return false;
      }
    }),
    {
      name: 'semanticflix-storage',
      partialize: (state) => ({ 
        favorites: state.favorites, 
        isLoggedIn: state.isLoggedIn,
        token: state.token,
        user: state.user
      }), // Only persist these
    }
  )
);
