import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { ProductCard } from './ProductCard';
import { Colors, Spacing } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

interface ProductGridProps {
  filters: {
    category: string;
    sortBy: string;
    priceRange: [number, number];
  };
}

// Mock product data
const mockProducts = [
  {
    id: '1',
    name: 'Silk Midi Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
    category: 'women',
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 189,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isNew: true,
    category: 'women',
  },
  {
    id: '3',
    name: 'Leather Handbag',
    price: 459,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'accessories',
  },
  {
    id: '4',
    name: 'Wool Coat',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
    category: 'women',
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    price: 49,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
  },
  {
    id: '6',
    name: 'Denim Jacket',
    price: 129,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'men',
  },
];

export const ProductGrid: React.FC<ProductGridProps> = ({ filters }) => {
  // Filter products based on current filters
  const filteredProducts = mockProducts.filter(product => {
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low-high':
        return a.price - b.price;
      case 'price-high-low':
        return b.price - a.price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  const renderProduct = ({ item, index }: { item: any; index: number }) => (
    <ProductCard product={item} index={index} />
  );

  const numColumns = screenWidth > 768 ? 3 : 2;
  const itemWidth = (screenWidth - (Spacing.lg * 2) - (Spacing.md * (numColumns - 1))) / numColumns;

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  grid: {
    padding: Spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
});
