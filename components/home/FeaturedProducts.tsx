import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AnimatedView } from '../ui/AnimatedView';
import { Colors, Typography, Spacing } from '../../constants';
import { formatPrice } from '../../utils';

const { width: screenWidth } = Dimensions.get('window');

interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

const featuredProducts: FeaturedProduct[] = [
  {
    id: '1',
    name: 'Silk Midi Dress',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
  },
  {
    id: '2',
    name: 'Cashmere Sweater',
    price: 189,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isNew: true,
  },
  {
    id: '3',
    name: 'Leather Handbag',
    price: 459,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Wool Coat',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isSale: true,
  },
];

export const FeaturedProducts: React.FC = () => {
  const router = useRouter();

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  const renderProduct = ({ item, index }: { item: FeaturedProduct; index: number }) => (
    <AnimatedView
      animation="scaleIn"
      delay={200 + index * 100}
      style={styles.productWrapper}
    >
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item.image }}
            style={styles.productImage}
            contentFit="cover"
            transition={300}
          />
          
          {/* Badges */}
          {(item.isNew || item.isSale) && (
            <View style={styles.badgeContainer}>
              {item.isNew && (
                <View style={[styles.badge, styles.newBadge]}>
                  <Text style={styles.badgeText}>NEW</Text>
                </View>
              )}
              {item.isSale && (
                <View style={[styles.badge, styles.saleBadge]}>
                  <Text style={styles.badgeText}>SALE</Text>
                </View>
              )}
            </View>
          )}

          {/* Wishlist Button */}
          <TouchableOpacity style={styles.wishlistButton} activeOpacity={0.7}>
            <Ionicons name="heart-outline" size={20} color={Colors.text.primary} />
          </TouchableOpacity>
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

  return (
    <View style={styles.container}>
      <AnimatedView animation="slideUp" delay={100}>
        <View style={styles.header}>
          <Text style={styles.title}>Featured Products</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop' as any)}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
      </AnimatedView>

      <FlatList
        data={featuredProducts}
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
    paddingVertical: Spacing['5xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing['3xl'],
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
  },
  viewAllText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textDecorationLine: 'underline',
  },
  productsList: {
    paddingHorizontal: Spacing.lg,
  },
  productWrapper: {
    width: screenWidth * 0.6,
    maxWidth: 240,
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
  badgeContainer: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    gap: Spacing.xs,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radius.sm,
  },
  newBadge: {
    backgroundColor: Colors.accent.sage,
  },
  saleBadge: {
    backgroundColor: Colors.semantic.error,
  },
  badgeText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    fontWeight: Typography.weights.bold,
    fontSize: 10,
  },
  wishlistButton: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    width: 32,
    height: 32,
    backgroundColor: Colors.background.overlayLight,
    borderRadius: Spacing.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    padding: Spacing.lg,
  },
  productName: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  originalPrice: {
    ...Typography.styles.bodySmall,
    color: Colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
});
