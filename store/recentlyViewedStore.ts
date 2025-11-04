import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types';

interface RecentlyViewedStore {
  items: Product[];
  addItem: (product: Product) => void;
  getItems: () => Product[];
  clearItems: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => {
        set((state) => {
          // Remove if already exists
          const filtered = state.items.filter(item => item.id !== product.id);
          
          // Add to beginning and limit to 20 items
          const newItems = [product, ...filtered].slice(0, 20);
          
          return {
            items: newItems,
          };
        });
      },
      
      getItems: () => {
        return get().items;
      },
      
      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'recently-viewed-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window !== 'undefined') {
            return localStorage.getItem(name);
          }
          return null;
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(name, value);
          }
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      })),
    }
  )
);
