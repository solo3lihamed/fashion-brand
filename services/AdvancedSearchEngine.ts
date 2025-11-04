import { Product } from '../types';

export interface SearchSuggestion {
  id: string;
  text: string;
  type: 'product' | 'category' | 'brand' | 'query';
  metadata?: any;
  popularity: number;
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  priceRange?: { min: number; max: number };
  colors?: string[];
  sizes?: string[];
  rating?: number;
  inStock?: boolean;
}

export interface SearchResult {
  products: Product[];
  suggestions: SearchSuggestion[];
  totalCount: number;
  facets: {
    categories: { name: string; count: number }[];
    brands: { name: string; count: number }[];
    priceRanges: { range: string; count: number }[];
    colors: { name: string; count: number }[];
    sizes: { name: string; count: number }[];
  };
}

export class AdvancedSearchEngine {
  private searchHistory: string[] = [];
  private popularQueries: { [query: string]: number } = {};
  private synonyms: { [word: string]: string[] } = {
    'dress': ['gown', 'frock', 'outfit'],
    'shirt': ['blouse', 'top', 'tee'],
    'pants': ['trousers', 'jeans', 'slacks'],
    'shoes': ['footwear', 'sneakers', 'boots'],
    'bag': ['handbag', 'purse', 'tote'],
  };

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData() {
    this.popularQueries = {
      'silk dress': 150,
      'cashmere sweater': 120,
      'leather bag': 100,
      'denim jacket': 90,
      'black dress': 85,
      'white shirt': 80,
    };
  }

  /**
   * Get autocomplete suggestions based on partial query
   */
  getAutocompleteSuggestions(query: string, limit: number = 8): SearchSuggestion[] {
    const suggestions: SearchSuggestion[] = [];
    const lowerQuery = query.toLowerCase().trim();

    if (lowerQuery.length < 2) return suggestions;

    // Product name suggestions
    const productSuggestions = this.getProductSuggestions(lowerQuery);
    suggestions.push(...productSuggestions.slice(0, 3));

    // Category suggestions
    const categorySuggestions = this.getCategorySuggestions(lowerQuery);
    suggestions.push(...categorySuggestions.slice(0, 2));

    // Brand suggestions
    const brandSuggestions = this.getBrandSuggestions(lowerQuery);
    suggestions.push(...brandSuggestions.slice(0, 2));

    // Popular query suggestions
    const querySuggestions = this.getQuerySuggestions(lowerQuery);
    suggestions.push(...querySuggestions.slice(0, 3));

    return suggestions
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, limit);
  }

  /**
   * Perform intelligent product search with fuzzy matching
   */
  searchProducts(
    query: string,
    products: Product[],
    filters: SearchFilters = {},
    sortBy: string = 'relevance'
  ): SearchResult {
    const lowerQuery = query.toLowerCase().trim();
    
    // Track search query
    this.trackSearchQuery(query);

    // Apply text search
    let filteredProducts = this.performTextSearch(lowerQuery, products);

    // Apply filters
    filteredProducts = this.applyFilters(filteredProducts, filters);

    // Sort results
    filteredProducts = this.sortResults(filteredProducts, lowerQuery, sortBy);

    // Generate facets
    const facets = this.generateFacets(filteredProducts);

    // Get suggestions for the query
    const suggestions = this.getAutocompleteSuggestions(query);

    return {
      products: filteredProducts,
      suggestions,
      totalCount: filteredProducts.length,
      facets,
    };
  }

  /**
   * Get trending search queries
   */
  getTrendingQueries(limit: number = 10): string[] {
    return Object.entries(this.popularQueries)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([query]) => query);
  }

  /**
   * Get search history for user
   */
  getSearchHistory(limit: number = 10): string[] {
    return this.searchHistory.slice(-limit).reverse();
  }

  private performTextSearch(query: string, products: Product[]): Product[] {
    if (!query) return products;

    const queryWords = query.split(' ').filter(word => word.length > 0);
    
    return products
      .map(product => ({
        product,
        score: this.calculateRelevanceScore(product, queryWords),
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }

  private calculateRelevanceScore(product: Product, queryWords: string[]): number {
    let score = 0;
    const productText = [
      product.name,
      product.description,
      product.brand,
      product.category,
      ...(product.tags || []),
    ].join(' ').toLowerCase();

    queryWords.forEach(word => {
      // Exact match in name (highest weight)
      if (product.name.toLowerCase().includes(word)) {
        score += 10;
      }

      // Exact match in description
      if (product.description?.toLowerCase().includes(word)) {
        score += 5;
      }

      // Exact match in brand
      if (product.brand.toLowerCase().includes(word)) {
        score += 8;
      }

      // Exact match in category
      if (product.category.toLowerCase().includes(word)) {
        score += 6;
      }

      // Exact match in tags
      if (product.tags?.some(tag => tag.toLowerCase().includes(word))) {
        score += 4;
      }

      // Fuzzy matching
      score += this.getFuzzyMatchScore(word, productText);

      // Synonym matching
      const synonyms = this.synonyms[word] || [];
      synonyms.forEach(synonym => {
        if (productText.includes(synonym)) {
          score += 3;
        }
      });
    });

    return score;
  }

  private getFuzzyMatchScore(word: string, text: string): number {
    // Simple fuzzy matching based on edit distance
    const words = text.split(' ');
    let maxScore = 0;

    words.forEach(textWord => {
      const distance = this.levenshteinDistance(word, textWord);
      const similarity = 1 - distance / Math.max(word.length, textWord.length);
      
      if (similarity > 0.7) { // 70% similarity threshold
        maxScore = Math.max(maxScore, similarity * 2);
      }
    });

    return maxScore;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }

    return matrix[str2.length][str1.length];
  }

  private applyFilters(products: Product[], filters: SearchFilters): Product[] {
    return products.filter(product => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.brand && product.brand !== filters.brand) return false;
      if (filters.inStock !== undefined && product.inStock !== filters.inStock) return false;
      
      if (filters.priceRange) {
        const { min, max } = filters.priceRange;
        if (product.price < min || product.price > max) return false;
      }

      if (filters.rating && product.rating && product.rating < filters.rating) return false;

      return true;
    });
  }

  private sortResults(products: Product[], query: string, sortBy: string): Product[] {
    switch (sortBy) {
      case 'price-low-high':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return products.sort((a, b) => b.price - a.price);
      case 'rating':
        return products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'relevance':
      default:
        return products; // Already sorted by relevance in performTextSearch
    }
  }

  private generateFacets(products: Product[]) {
    const categories = new Map<string, number>();
    const brands = new Map<string, number>();
    const colors = new Map<string, number>();
    const sizes = new Map<string, number>();

    products.forEach(product => {
      // Categories
      categories.set(product.category, (categories.get(product.category) || 0) + 1);
      
      // Brands
      brands.set(product.brand, (brands.get(product.brand) || 0) + 1);
      
      // Colors
      product.colors?.forEach(color => {
        colors.set(color.name, (colors.get(color.name) || 0) + 1);
      });
      
      // Sizes
      product.sizes?.forEach(size => {
        sizes.set(size.name, (sizes.get(size.name) || 0) + 1);
      });
    });

    return {
      categories: Array.from(categories.entries()).map(([name, count]) => ({ name, count })),
      brands: Array.from(brands.entries()).map(([name, count]) => ({ name, count })),
      colors: Array.from(colors.entries()).map(([name, count]) => ({ name, count })),
      sizes: Array.from(sizes.entries()).map(([name, count]) => ({ name, count })),
      priceRanges: [
        { range: '$0 - $50', count: products.filter(p => p.price <= 50).length },
        { range: '$51 - $100', count: products.filter(p => p.price > 50 && p.price <= 100).length },
        { range: '$101 - $200', count: products.filter(p => p.price > 100 && p.price <= 200).length },
        { range: '$201+', count: products.filter(p => p.price > 200).length },
      ],
    };
  }

  private getProductSuggestions(query: string): SearchSuggestion[] {
    // Mock product suggestions - in a real app, this would query a product database
    const mockProducts = [
      'Silk Midi Dress',
      'Cashmere Sweater',
      'Leather Handbag',
      'Wool Coat',
      'Cotton T-Shirt',
      'Denim Jacket',
    ];

    return mockProducts
      .filter(name => name.toLowerCase().includes(query))
      .map((name, index) => ({
        id: `product-${index}`,
        text: name,
        type: 'product' as const,
        popularity: 100 - index * 10,
      }));
  }

  private getCategorySuggestions(query: string): SearchSuggestion[] {
    const categories = ['Women', 'Men', 'Accessories', 'Shoes', 'Bags'];
    
    return categories
      .filter(category => category.toLowerCase().includes(query))
      .map((category, index) => ({
        id: `category-${index}`,
        text: category,
        type: 'category' as const,
        popularity: 80 - index * 5,
      }));
  }

  private getBrandSuggestions(query: string): SearchSuggestion[] {
    const brands = ['Fashion Studio', 'Luxury Brand', 'Designer Label'];
    
    return brands
      .filter(brand => brand.toLowerCase().includes(query))
      .map((brand, index) => ({
        id: `brand-${index}`,
        text: brand,
        type: 'brand' as const,
        popularity: 70 - index * 5,
      }));
  }

  private getQuerySuggestions(query: string): SearchSuggestion[] {
    return Object.entries(this.popularQueries)
      .filter(([popularQuery]) => popularQuery.includes(query))
      .map(([text, popularity]) => ({
        id: `query-${text}`,
        text,
        type: 'query' as const,
        popularity,
      }));
  }

  private trackSearchQuery(query: string) {
    if (query.trim().length > 0) {
      this.searchHistory.push(query);
      if (this.searchHistory.length > 50) {
        this.searchHistory = this.searchHistory.slice(-50);
      }
      
      this.popularQueries[query] = (this.popularQueries[query] || 0) + 1;
    }
  }
}
