import { Product } from '../types';

export interface UserBehavior {
  userId: string;
  productViews: { productId: string; timestamp: Date; duration: number }[];
  purchases: { productId: string; timestamp: Date; rating?: number }[];
  wishlistItems: string[];
  searchQueries: { query: string; timestamp: Date; resultsClicked: string[] }[];
  categoryPreferences: { [category: string]: number };
  brandPreferences: { [brand: string]: number };
  priceRange: { min: number; max: number; frequency: number };
  sizePreferences: { [size: string]: number };
  colorPreferences: { [color: string]: number };
}

export interface ProductSimilarity {
  productId: string;
  similarProducts: { productId: string; score: number }[];
}

export interface RecommendationContext {
  currentProduct?: Product;
  userLocation?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  season: 'spring' | 'summer' | 'fall' | 'winter';
  occasion?: 'casual' | 'formal' | 'work' | 'party' | 'sport';
  weather?: 'sunny' | 'rainy' | 'cold' | 'hot';
}

export class AIRecommendationEngine {
  private userBehaviors: Map<string, UserBehavior> = new Map();
  private productSimilarities: Map<string, ProductSimilarity> = new Map();
  private globalTrends: { [productId: string]: number } = {};

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    // Mock user behavior data
    const mockUserBehavior: UserBehavior = {
      userId: 'user1',
      productViews: [
        { productId: '1', timestamp: new Date(), duration: 45000 },
        { productId: '2', timestamp: new Date(), duration: 30000 },
      ],
      purchases: [
        { productId: '1', timestamp: new Date(), rating: 5 },
      ],
      wishlistItems: ['2', '3'],
      searchQueries: [
        { query: 'silk dress', timestamp: new Date(), resultsClicked: ['1'] },
      ],
      categoryPreferences: { women: 0.8, accessories: 0.2 },
      brandPreferences: { 'Fashion Studio': 0.9 },
      priceRange: { min: 100, max: 500, frequency: 0.7 },
      sizePreferences: { M: 0.6, L: 0.4 },
      colorPreferences: { black: 0.4, navy: 0.3, white: 0.3 },
    };

    this.userBehaviors.set('user1', mockUserBehavior);

    // Mock product similarities
    this.productSimilarities.set('1', {
      productId: '1',
      similarProducts: [
        { productId: '2', score: 0.85 },
        { productId: '4', score: 0.72 },
        { productId: '3', score: 0.68 },
      ],
    });

    // Mock global trends
    this.globalTrends = {
      '1': 0.95,
      '2': 0.88,
      '3': 0.76,
      '4': 0.82,
      '5': 0.71,
      '6': 0.69,
    };
  }

  /**
   * Get personalized product recommendations using collaborative filtering
   */
  getPersonalizedRecommendations(
    userId: string,
    products: Product[],
    context: RecommendationContext,
    limit: number = 10
  ): Product[] {
    const userBehavior = this.userBehaviors.get(userId);
    if (!userBehavior) {
      return this.getFallbackRecommendations(products, context, limit);
    }

    const scores = new Map<string, number>();

    // Calculate recommendation scores for each product
    products.forEach(product => {
      let score = 0;

      // Category preference scoring
      const categoryScore = userBehavior.categoryPreferences[product.category] || 0;
      score += categoryScore * 0.3;

      // Brand preference scoring
      const brandScore = userBehavior.brandPreferences[product.brand] || 0;
      score += brandScore * 0.2;

      // Price range scoring
      const priceInRange = product.price >= userBehavior.priceRange.min && 
                          product.price <= userBehavior.priceRange.max;
      if (priceInRange) {
        score += userBehavior.priceRange.frequency * 0.2;
      }

      // Global trend scoring
      const trendScore = this.globalTrends[product.id] || 0;
      score += trendScore * 0.15;

      // Context-based scoring
      score += this.getContextualScore(product, context) * 0.15;

      scores.set(product.id, score);
    });

    // Sort by score and return top recommendations
    return products
      .sort((a, b) => (scores.get(b.id) || 0) - (scores.get(a.id) || 0))
      .slice(0, limit);
  }

  /**
   * Get similar products using content-based filtering
   */
  getSimilarProducts(productId: string, products: Product[], limit: number = 6): Product[] {
    const similarities = this.productSimilarities.get(productId);
    if (!similarities) {
      return this.getContentBasedSimilar(productId, products, limit);
    }

    const similarProductIds = similarities.similarProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.productId);

    return products.filter(product => similarProductIds.includes(product.id));
  }

  /**
   * Update user behavior based on interactions
   */
  updateUserBehavior(userId: string, interaction: {
    type: 'view' | 'purchase' | 'wishlist' | 'search';
    productId?: string;
    data?: any;
  }) {
    let userBehavior = this.userBehaviors.get(userId);
    if (!userBehavior) {
      userBehavior = this.createNewUserBehavior(userId);
    }

    switch (interaction.type) {
      case 'view':
        if (interaction.productId) {
          userBehavior.productViews.push({
            productId: interaction.productId,
            timestamp: new Date(),
            duration: interaction.data?.duration || 0,
          });
        }
        break;
      case 'purchase':
        if (interaction.productId) {
          userBehavior.purchases.push({
            productId: interaction.productId,
            timestamp: new Date(),
            rating: interaction.data?.rating,
          });
        }
        break;
      case 'wishlist':
        if (interaction.productId) {
          if (!userBehavior.wishlistItems.includes(interaction.productId)) {
            userBehavior.wishlistItems.push(interaction.productId);
          }
        }
        break;
      case 'search':
        userBehavior.searchQueries.push({
          query: interaction.data?.query || '',
          timestamp: new Date(),
          resultsClicked: interaction.data?.resultsClicked || [],
        });
        break;
    }

    this.userBehaviors.set(userId, userBehavior);
  }

  private getContextualScore(product: Product, context: RecommendationContext): number {
    let score = 0;

    // Time-based scoring
    if (context.timeOfDay === 'evening' && product.category === 'women' && 
        product.tags?.includes('elegant')) {
      score += 0.3;
    }

    // Season-based scoring
    if (context.season === 'winter' && product.tags?.includes('warm')) {
      score += 0.4;
    }

    // Occasion-based scoring
    if (context.occasion === 'formal' && product.tags?.includes('elegant')) {
      score += 0.5;
    }

    return Math.min(score, 1.0);
  }

  private getFallbackRecommendations(
    products: Product[],
    context: RecommendationContext,
    limit: number
  ): Product[] {
    // Return trending products for new users
    return products
      .sort((a, b) => (this.globalTrends[b.id] || 0) - (this.globalTrends[a.id] || 0))
      .slice(0, limit);
  }

  private getContentBasedSimilar(
    productId: string,
    products: Product[],
    limit: number
  ): Product[] {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return [];

    // Simple content-based similarity using category and tags
    return products
      .filter(p => p.id !== productId)
      .map(product => ({
        product,
        score: this.calculateContentSimilarity(targetProduct, product),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.product);
  }

  private calculateContentSimilarity(product1: Product, product2: Product): number {
    let score = 0;

    // Category similarity
    if (product1.category === product2.category) score += 0.4;

    // Brand similarity
    if (product1.brand === product2.brand) score += 0.2;

    // Price range similarity
    const priceDiff = Math.abs(product1.price - product2.price);
    const priceScore = Math.max(0, 1 - priceDiff / Math.max(product1.price, product2.price));
    score += priceScore * 0.2;

    // Tag similarity
    const commonTags = product1.tags?.filter(tag => product2.tags?.includes(tag)) || [];
    const tagScore = commonTags.length / Math.max(product1.tags?.length || 1, product2.tags?.length || 1);
    score += tagScore * 0.2;

    return score;
  }

  private createNewUserBehavior(userId: string): UserBehavior {
    return {
      userId,
      productViews: [],
      purchases: [],
      wishlistItems: [],
      searchQueries: [],
      categoryPreferences: {},
      brandPreferences: {},
      priceRange: { min: 0, max: 1000, frequency: 0.5 },
      sizePreferences: {},
      colorPreferences: {},
    };
  }
}
