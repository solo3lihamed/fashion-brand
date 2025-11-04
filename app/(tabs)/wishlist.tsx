import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Layout } from '../../components/layout';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { Button } from '../../components/ui/Button';
import { WishlistButton } from '../../components/ui/WishlistButton';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils';
import { Product } from '../../types';

const { width: screenWidth } = Dimensions.get('window');

interface WishlistItemProps {
  product: Product;
  onPress: (productId: string) => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ product, onPress }) => {
  return (
    <AnimatedView animation="scaleIn" style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.item}
        onPress={() => onPress(product.id)}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: product.images[0] }}
          style={styles.itemImage}
          contentFit="cover"
        />
        
        <View style={styles.itemDetails}>
          <Text style={styles.itemName} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.itemBrand}>{product.brand}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
            )}
          </View>
          
          <View style={styles.stockStatus}>
            <View style={[styles.stockIndicator, product.inStock ? styles.inStock : styles.outOfStock]} />
            <Text style={[styles.stockText, !product.inStock && styles.outOfStockText]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
        </View>
        
        <View style={styles.itemActions}>
          <WishlistButton product={product} size={20} showBackground={false} />
        </View>
      </TouchableOpacity>
    </AnimatedView>
  );
};

export default function Wishlist() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const { items: wishlistItems, clearWishlist } = useWishlistStore();

  const handleProductPress = (productId: string) => {
    router.push(`/product/${productId}` as any);
  };

  const handleContinueShopping = () => {
    router.push('/(tabs)/shop');
  };

  const handleClearWishlist = () => {
    clearWishlist();
  };

  const renderItem = ({ item }: { item: Product }) => (
    <WishlistItem product={item} onPress={handleProductPress} />
  );

  return (
    <Layout
      headerProps={{
        title: 'Wishlist',
        showBack: false,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      showFooter={false}
      scrollable={false}
    >
      <View style={styles.container}>
        {wishlistItems.length === 0 ? (
          <AnimatedView animation="fadeIn" delay={200}>
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={64} color={Colors.text.tertiary} />
              <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
              <Text style={styles.emptySubtitle}>
                Save items you love by tapping the heart icon
              </Text>
              <Button
                title="Start Shopping"
                onPress={handleContinueShopping}
                variant="primary"
                size="large"
                style={styles.shopButton}
              />
            </View>
          </AnimatedView>
        ) : (
          <>
            <AnimatedView animation="slideUp" delay={200}>
              <View style={styles.header}>
                <Text style={styles.title}>
                  {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
                </Text>
                <TouchableOpacity onPress={handleClearWishlist} activeOpacity={0.7}>
                  <Text style={styles.clearText}>Clear All</Text>
                </TouchableOpacity>
              </View>
            </AnimatedView>

            <FlatList
              data={wishlistItems}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ height: Spacing.lg }} />}
            />
          </>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4xl'],
    minHeight: 400,
  },
  emptyTitle: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['4xl'],
    maxWidth: 280,
  },
  shopButton: {
    minWidth: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  title: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
  },
  clearText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  list: {
    padding: Spacing.lg,
  },
  itemContainer: {
    marginBottom: Spacing.lg,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.lg,
    elevation: 2,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  itemImage: {
    width: 80,
    height: 100,
    borderRadius: Spacing.radius.sm,
    marginRight: Spacing.lg,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    marginBottom: Spacing.xs,
  },
  itemBrand: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    marginBottom: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
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
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  stockIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inStock: {
    backgroundColor: Colors.accent.sage,
  },
  outOfStock: {
    backgroundColor: Colors.semantic.error,
  },
  stockText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
  },
  outOfStockText: {
    color: Colors.semantic.error,
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: Spacing.md,
  },
});
