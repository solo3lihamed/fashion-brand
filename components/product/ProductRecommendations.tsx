import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AnimatedView } from '../ui/AnimatedView';
import { WishlistButton } from '../ui/WishlistButton';
import { Colors, Typography, Spacing } from '../../constants';
import { Product } from '../../types';
import { formatPrice } from '../../utils';

const { width: screenWidth } = Dimensions.get('window');

interface ProductRecommendationsProps {
  currentProductId: string;
  title?: string;
}

// Mock recommendations data - in a real app, this would come from an API
const mockRecommendations: Product[] = [
  {
    id: '3',
    name: 'Leather Handbag',
    price: 459,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: 'accessories',
    brand: 'Fashion Studio',
    sizes: [],
    colors: [],
    inStock: true,
    tags: [],
    description: '',
  },
  {
    id: '4',
    name: 'Wool Coat',
    price: 599,
    originalPrice: 799,
    images: ['https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: 'women',
    brand: 'Fashion Studio',
    sizes: [],
    colors: [],
    inStock: true,
    isSale: true,
    tags: [],
    description: '',
  },
  {
    id: '5',
    name: 'Cotton T-Shirt',
    price: 49,
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: 'men',
    brand: 'Fashion Studio',
    sizes: [],
    colors: [],
    inStock: true,
    tags: [],
    description: '',
  },
  {
    id: '6',
    name: 'Denim Jacket',
    price: 129,
    images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    category: 'men',
    brand: 'Fashion Studio',
    sizes: [],
    colors: [],
    inStock: true,
    tags: [],
    description: '',
  },
];

export const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({
  currentProductId,
  title = "You might also like",
}) => {
  const router = useRouter();
  
  // Filter out current product and get recommendations
  const recommendations = mockRecommendations.filter(product => product.id !== currentProductId);

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  const renderProduct = ({ item, index }: { item: Product; index: number }) => (
    <AnimatedView
      animation="scaleIn"
      delay={index * 100}
      style={styles.productWrapper}
    >
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.images[0] }}
            style={styles.productImage}
            contentFit="cover"
            transition={300}
          />
          
          {/* Sale Badge */}
          {item.isSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.badgeText}>SALE</Text>
            </View>
          )}

          {/* Wishlist Button */}
          <View style={styles.wishlistContainer}>
            <WishlistButton
              product={item}
              size={20}
              showBackground={true}
            />
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(item.originalPrice)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </AnimatedView>
  );

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AnimatedView animation="slideUp" delay={100}>
        <Text style={styles.title}>{title}</Text>
      </AnimatedView>

      <FlatList
        data={recommendations}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsList}
        ItemSeparatorComponent={() => <View style={{ width: Spacing.lg }} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['4xl'],
  },
  title: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
  },
  productsList: {
    paddingHorizontal: Spacing.lg,
  },
  productWrapper: {
    width: screenWidth * 0.45,
    maxWidth: 200,
  },
  productCard: {
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.radius.lg,
    overflow: 'hidden',
    elevation: 2,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    position: 'relative',
    aspectRatio: 3/4,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  saleBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.semantic.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radius.sm,
  },
  badgeText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    fontWeight: Typography.weights.bold,
    fontSize: 10,
  },
  wishlistContainer: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  productInfo: {
    padding: Spacing.lg,
  },
  productName: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.sm,
    lineHeight: Typography.lineHeights.normal * Typography.sizes.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  price: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  originalPrice: {
    ...Typography.styles.caption,
    color: Colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
});
