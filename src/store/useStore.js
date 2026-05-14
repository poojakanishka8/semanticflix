import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      favorites: [],
      isLoggedIn: false,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),
      isFavorite: (movieId) => {
        // We'll compute this in components, but it's handy
        return false;
      }
    }),
    {
      name: 'semanticflix-favorites', // name of the item in the storage (must be unique)
    }
  )
);
