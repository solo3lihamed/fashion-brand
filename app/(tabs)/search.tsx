import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '../../components/layout';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { ProductCard } from '../../components/shop/ProductCard';
import { debounce } from '../../utils';

// Mock search data - in a real app, this would come from an API
const mockSearchData = [
  {
    id: '1',
    name: 'Silk Midi Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
    category: 'women',
    tags: ['silk', 'midi', 'dress', 'elegant'],
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 189,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isNew: true,
    category: 'women',
    tags: ['cashmere', 'sweater', 'luxury', 'warm'],
  },
  {
    id: '3',
    name: 'Leather Handbag',
    price: 459,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
    tags: ['leather', 'handbag', 'luxury', 'accessories'],
  },
  {
    id: '4',
    name: 'Wool Coat',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
    category: 'women',
    tags: ['wool', 'coat', 'winter', 'outerwear'],
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    price: 49,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    tags: ['cotton', 'tshirt', 'casual', 'basic'],
  },
  {
    id: '6',
    name: 'Denim Jacket',
    price: 129,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
    tags: ['denim', 'jacket', 'casual', 'classic'],
  },
];

const popularSearches = [
  'Dresses', 'Sweaters', 'Jeans', 'Shoes', 'Bags', 'Coats', 'T-Shirts', 'Accessories'
];

const recentSearches = [
  'Black dress', 'Cashmere sweater', 'Leather bag'
];

export default function Search() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    if (query.trim().length === 0) {
      setSearchResults([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Simulate API call delay
    setTimeout(() => {
      const results = mockSearchData.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(results);
      setHasSearched(true);
      setIsSearching(false);
    }, 300);
  }, 300);

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <Layout
      headerProps={{
        title: 'Search',
        showBack: false,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      showFooter={false}
      scrollable={false}
    >
      <View style={styles.container}>
        <AnimatedView animation="slideDown" delay={200}>
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color={Colors.text.tertiary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor={Colors.text.tertiary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={false}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                  <Ionicons name="close-circle" size={20} color={Colors.text.tertiary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </AnimatedView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {!hasSearched && searchQuery.length === 0 ? (
            // Default state - show popular and recent searches
            <>
              <AnimatedView animation="fadeIn" delay={400}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Popular Searches</Text>
                  <View style={styles.tagsContainer}>
                    {popularSearches.map((term, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.tag}
                        onPress={() => handlePopularSearch(term)}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.tagText}>{term}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </AnimatedView>

              <AnimatedView animation="fadeIn" delay={600}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Recent Searches</Text>
                  {recentSearches.map((term, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.recentItem}
                      onPress={() => handlePopularSearch(term)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="time-outline" size={16} color={Colors.text.tertiary} />
                      <Text style={styles.recentText}>{term}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </AnimatedView>
            </>
          ) : isSearching ? (
            // Loading state
            <AnimatedView animation="fadeIn" delay={200}>
              <View style={styles.loadingState}>
                <Text style={styles.loadingText}>Searching...</Text>
              </View>
            </AnimatedView>
          ) : searchResults.length > 0 ? (
            // Results state
            <AnimatedView animation="fadeIn" delay={200}>
              <View style={styles.resultsSection}>
                <Text style={styles.resultsTitle}>
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                </Text>
                <FlatList
                  data={searchResults}
                  renderItem={({ item, index }) => (
                    <ProductCard product={item} index={index} />
                  )}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  columnWrapperStyle={styles.row}
                  contentContainerStyle={styles.resultsGrid}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
                />
              </View>
            </AnimatedView>
          ) : (
            // No results state
            <AnimatedView animation="fadeIn" delay={200}>
              <View style={styles.noResultsState}>
                <Ionicons name="search-outline" size={48} color={Colors.text.tertiary} />
                <Text style={styles.noResultsTitle}>No results found</Text>
                <Text style={styles.noResultsText}>
                  Try searching with different keywords or browse our categories
                </Text>
              </View>
            </AnimatedView>
          )}
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  searchContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    paddingHorizontal: Spacing.lg,
    height: 48,
  },
  searchIcon: {
    marginRight: Spacing.md,
  },
  searchInput: {
    flex: 1,
    ...Typography.styles.body,
    color: Colors.text.primary,
    height: '100%',
  },
  clearButton: {
    marginLeft: Spacing.md,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  tag: {
    backgroundColor: Colors.background.secondary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.radius.full,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  tagText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  recentText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4xl'],
    minHeight: 200,
  },
  loadingText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  resultsSection: {
    padding: Spacing.lg,
  },
  resultsTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
  },
  resultsGrid: {
    gap: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  noResultsState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4xl'],
    minHeight: 300,
  },
  noResultsTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  noResultsText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
});
