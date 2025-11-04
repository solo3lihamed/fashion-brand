import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AIRecommendationEngine, UserBehavior, RecommendationContext } from '../services/AIRecommendationEngine';
import { Product } from '../types';

export interface UserPreferences {
  userId: string;
  favoriteCategories: string[];
  favoriteBrands: string[];
  preferredPriceRange: { min: number; max: number };
  preferredSizes: string[];
  preferredColors: string[];
  personalizedHomepage: boolean;
  adaptiveSorting: boolean;
  notificationPreferences: {
    newArrivals: boolean;
    priceDrops: boolean;
    backInStock: boolean;
    recommendations: boolean;
  };
  theme: 'light' | 'dark' | 'auto';
  language: string;
  currency: string;
}

interface PersonalizationStore {
  preferences: UserPreferences;
  aiEngine: AIRecommendationEngine;
  isPersonalizationEnabled: boolean;
  
  // Actions
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  trackUserInteraction: (interaction: {
    type: 'view' | 'purchase' | 'wishlist' | 'search';
    productId?: string;
    data?: any;
  }) => void;
  getPersonalizedRecommendations: (products: Product[], context?: Partial<RecommendationContext>, limit?: number) => Product[];
  getSimilarProducts: (productId: string, products: Product[], limit?: number) => Product[];
  getPersonalizedSortOrder: (products: Product[]) => Product[];
  enablePersonalization: () => void;
  disablePersonalization: () => void;
  resetPersonalization: () => void;
}

const defaultPreferences: UserPreferences = {
  userId: 'anonymous',
  favoriteCategories: [],
  favoriteBrands: [],
  preferredPriceRange: { min: 0, max: 1000 },
  preferredSizes: [],
  preferredColors: [],
  personalizedHomepage: true,
  adaptiveSorting: true,
  notificationPreferences: {
    newArrivals: true,
    priceDrops: true,
    backInStock: true,
    recommendations: true,
  },
  theme: 'auto',
  language: 'en',
  currency: 'USD',
};

export const usePersonalizationStore = create<PersonalizationStore>()(
  persist(
    (set, get) => ({
      preferences: defaultPreferences,
      aiEngine: new AIRecommendationEngine(),
      isPersonalizationEnabled: true,

      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        }));
      },

      trackUserInteraction: (interaction) => {
        const { aiEngine, preferences, isPersonalizationEnabled } = get();
        if (!isPersonalizationEnabled) return;

        aiEngine.updateUserBehavior(preferences.userId, interaction);

        // Update preferences based on interactions
        if (interaction.type === 'view' || interaction.type === 'purchase') {
          // This would typically involve more sophisticated learning
          // For now, we'll implement basic preference updates
        }
      },

      getPersonalizedRecommendations: (products, context = {}, limit = 10) => {
        const { aiEngine, preferences, isPersonalizationEnabled } = get();
        if (!isPersonalizationEnabled) {
          return products.slice(0, limit);
        }

        const fullContext: RecommendationContext = {
          timeOfDay: get().getCurrentTimeOfDay(),
          season: get().getCurrentSeason(),
          ...context,
        };

        return aiEngine.getPersonalizedRecommendations(
          preferences.userId,
          products,
          fullContext,
          limit
        );
      },

      getSimilarProducts: (productId, products, limit = 6) => {
        const { aiEngine, isPersonalizationEnabled } = get();
        if (!isPersonalizationEnabled) {
          return products.slice(0, limit);
        }

        return aiEngine.getSimilarProducts(productId, products, limit);
      },

      getPersonalizedSortOrder: (products) => {
        const { preferences, isPersonalizationEnabled } = get();
        if (!isPersonalizationEnabled || !preferences.adaptiveSorting) {
          return products;
        }

        // Sort based on user preferences
        return products.sort((a, b) => {
          let scoreA = 0;
          let scoreB = 0;

          // Category preference scoring
          if (preferences.favoriteCategories.includes(a.category)) scoreA += 0.3;
          if (preferences.favoriteCategories.includes(b.category)) scoreB += 0.3;

          // Brand preference scoring
          if (preferences.favoriteBrands.includes(a.brand)) scoreA += 0.2;
          if (preferences.favoriteBrands.includes(b.brand)) scoreB += 0.2;

          // Price range preference scoring
          const { min, max } = preferences.preferredPriceRange;
          if (a.price >= min && a.price <= max) scoreA += 0.2;
          if (b.price >= min && b.price <= max) scoreB += 0.2;

          return scoreB - scoreA;
        });
      },

      enablePersonalization: () => {
        set({ isPersonalizationEnabled: true });
      },

      disablePersonalization: () => {
        set({ isPersonalizationEnabled: false });
      },

      resetPersonalization: () => {
        set({
          preferences: { ...defaultPreferences, userId: get().preferences.userId },
          aiEngine: new AIRecommendationEngine(),
        });
      },

      // Helper methods (would be implemented as separate functions in a real app)
      getCurrentTimeOfDay: (): 'morning' | 'afternoon' | 'evening' | 'night' => {
        const hour = new Date().getHours();
        if (hour < 6) return 'night';
        if (hour < 12) return 'morning';
        if (hour < 18) return 'afternoon';
        if (hour < 22) return 'evening';
        return 'night';
      },

      getCurrentSeason: (): 'spring' | 'summer' | 'fall' | 'winter' => {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'fall';
        return 'winter';
      },
    }),
    {
      name: 'personalization-storage',
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
      partialize: (state) => ({
        preferences: state.preferences,
        isPersonalizationEnabled: state.isPersonalizationEnabled,
      }),
    }
  )
);
