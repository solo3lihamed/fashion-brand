import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';
import { AnimatedView } from '../ui/AnimatedView';
import { WishlistButton } from '../ui/WishlistButton';
import { Colors, Typography, Spacing, Animations } from '../../constants';
import { formatPrice } from '../../utils';

const { width: screenWidth } = Dimensions.get('window');
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    images?: string[];
    isNew?: boolean;
    isSale?: boolean;
    description?: string;
    category?: string;
    brand?: string;
    sizes?: any[];
    colors?: any[];
    inStock?: boolean;
    tags?: string[];
  };
  index: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, Animations.spring.gentle);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Animations.spring.gentle);
  };

  const handlePress = () => {
    router.push(`/product/${product.id}` as any);
  };

  const numColumns = screenWidth > 768 ? 3 : 2;
  const itemWidth = (screenWidth - (Spacing.lg * 2) - (Spacing.md * (numColumns - 1))) / numColumns;

  return (
    <AnimatedView
      animation="scaleIn"
      delay={index * 100}
      style={[styles.container, { width: itemWidth }] as any}
    >
      <AnimatedTouchableOpacity
        style={[animatedStyle, styles.card]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            contentFit="cover"
            transition={300}
          />
          
          {/* Badges */}
          {(product.isNew || product.isSale) && (
            <View style={styles.badgeContainer}>
              {product.isNew && (
                <View style={[styles.badge, styles.newBadge]}>
                  <Text style={styles.badgeText}>NEW</Text>
                </View>
              )}
              {product.isSale && (
                <View style={[styles.badge, styles.saleBadge]}>
                  <Text style={styles.badgeText}>SALE</Text>
                </View>
              )}
            </View>
          )}

          {/* Wishlist Button */}
          <View style={styles.wishlistButtonContainer}>
            <WishlistButton product={product as any} size={18} showBackground={true} />
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.productName} numberOfLines={2}>
            {product.name}
          </Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
            )}
          </View>
        </View>
      </AnimatedTouchableOpacity>
    </AnimatedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  card: {
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
    top: Spacing.sm,
    left: Spacing.sm,
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
  wishlistButtonContainer: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  productInfo: {
    padding: Spacing.md,
  },
  productName: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.xs,
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
