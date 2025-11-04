import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert
} from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Layout } from '../../components/layout';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { Button } from '../../components/ui/Button';
import { WishlistButton } from '../../components/ui/WishlistButton';
import { ProductRecommendations } from '../../components/product/ProductRecommendations';
import { ProductReviews } from '../../components/product/ProductReviews';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { useRecentlyViewedStore } from '../../store/recentlyViewedStore';
import { Product, Size, Color } from '../../types';
import { formatPrice } from '../../utils';

const { width: screenWidth } = Dimensions.get('window');

// Mock product data - in a real app, this would come from an API
const mockProducts: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Silk Midi Dress',
    description: 'Elegant silk midi dress crafted from premium mulberry silk. Features a flattering A-line silhouette with delicate pleating and a timeless design that transitions seamlessly from day to evening wear.',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'women',
    subcategory: 'dresses',
    brand: 'Fashion Studio',
    sizes: [
      { id: 'xs', name: 'XS', value: 'Extra Small', inStock: true },
      { id: 's', name: 'S', value: 'Small', inStock: true },
      { id: 'm', name: 'M', value: 'Medium', inStock: true },
      { id: 'l', name: 'L', value: 'Large', inStock: false },
      { id: 'xl', name: 'XL', value: 'Extra Large', inStock: true },
    ],
    colors: [
      { id: 'black', name: 'Black', hex: '#000000', inStock: true },
      { id: 'navy', name: 'Navy', hex: '#1e3a8a', inStock: true },
      { id: 'burgundy', name: 'Burgundy', hex: '#7c2d12', inStock: false },
    ],
    inStock: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 127,
    tags: ['silk', 'midi', 'elegant', 'versatile'],
  },
  '2': {
    id: '2',
    name: 'Cashmere Sweater',
    description: 'Luxurious 100% cashmere sweater with a classic crew neck design. Incredibly soft and warm, perfect for layering or wearing on its own. Features ribbed cuffs and hem for a refined finish.',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    ],
    category: 'women',
    subcategory: 'knitwear',
    brand: 'Fashion Studio',
    sizes: [
      { id: 'xs', name: 'XS', value: 'Extra Small', inStock: true },
      { id: 's', name: 'S', value: 'Small', inStock: true },
      { id: 'm', name: 'M', value: 'Medium', inStock: true },
      { id: 'l', name: 'L', value: 'Large', inStock: true },
      { id: 'xl', name: 'XL', value: 'Extra Large', inStock: false },
    ],
    colors: [
      { id: 'cream', name: 'Cream', hex: '#f5f5dc', inStock: true },
      { id: 'gray', name: 'Gray', hex: '#6b7280', inStock: true },
      { id: 'camel', name: 'Camel', hex: '#d2b48c', inStock: true },
    ],
    inStock: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 89,
    tags: ['cashmere', 'luxury', 'soft', 'warm'],
  },
};

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem, getTotalItems } = useCartStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const cartItemCount = getTotalItems();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProduct = mockProducts[id as string];
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors.find(c => c.inStock) || foundProduct.colors[0]);
        setSelectedSize(foundProduct.sizes.find(s => s.inStock) || foundProduct.sizes[0]);

        // Add to recently viewed
        addToRecentlyViewed(foundProduct);
      }
      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) {
      Alert.alert('Selection Required', 'Please select size and color before adding to cart.');
      return;
    }

    addItem({
      id: '',
      productId: product.id,
      product,
      size: selectedSize,
      color: selectedColor,
      quantity,
      addedAt: new Date(),
    });

    Alert.alert(
      'Added to Cart',
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'default' },
        { text: 'View Cart', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  if (isLoading) {
    return (
      <Layout
        headerProps={{
          title: 'Product Details',
          showBack: true,
          showCart: true,
          cartItemCount,
        }}
        scrollable={false}
      >
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout
        headerProps={{
          title: 'Product Not Found',
          showBack: true,
          showCart: true,
          cartItemCount,
        }}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Product Not Found</Text>
          <Text style={styles.errorText}>The product you're looking for doesn't exist.</Text>
          <Button
            title="Back to Shop"
            onPress={() => router.push('/(tabs)/shop')}
            variant="primary"
            size="medium"
          />
        </View>
      </Layout>
    );
  }

  return (
    <Layout
      headerProps={{
        title: product.name,
        showBack: true,
        showCart: true,
        cartItemCount,
      }}
      scrollable={false}
      showFooter={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <AnimatedView animation="fadeIn" delay={200}>
          <View style={styles.imageGallery}>
            <Image
              source={{ uri: product.images[selectedImageIndex] }}
              style={styles.mainImage}
              contentFit="cover"
              transition={300}
            />

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.thumbnailContainer}
                contentContainerStyle={styles.thumbnailContent}
              >
                {product.images.map((image, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.thumbnail,
                      selectedImageIndex === index && styles.activeThumbnail,
                    ]}
                    onPress={() => setSelectedImageIndex(index)}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.thumbnailImage}
                      contentFit="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            {/* Badges */}
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

            {/* Wishlist Button */}
            <View style={styles.wishlistButtonContainer}>
              <WishlistButton product={product} size={24} showBackground={true} />
            </View>
          </View>
        </AnimatedView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <AnimatedView animation="slideUp" delay={400}>
            <View style={styles.headerSection}>
              <Text style={styles.brandName}>{product.brand}</Text>
              <Text style={styles.productName}>{product.name}</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                {product.originalPrice && (
                  <Text style={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </Text>
                )}
                {product.originalPrice && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Text>
                  </View>
                )}
              </View>

              {/* Rating */}
              {product.rating && (
                <View style={styles.ratingContainer}>
                  <View style={styles.stars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Ionicons
                        key={star}
                        name={star <= Math.floor(product.rating!) ? 'star' : 'star-outline'}
                        size={16}
                        color={Colors.accent.gold}
                      />
                    ))}
                  </View>
                  <Text style={styles.ratingText}>
                    {product.rating} ({product.reviewCount} reviews)
                  </Text>
                </View>
              )}
            </View>
          </AnimatedView>

          <AnimatedView animation="slideUp" delay={600}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </AnimatedView>

          {/* Color Selection */}
          <AnimatedView animation="slideUp" delay={800}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Color</Text>
              <View style={styles.colorOptions}>
                {product.colors.map((color) => (
                  <TouchableOpacity
                    key={color.id}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color.hex },
                      selectedColor?.id === color.id && styles.selectedColorOption,
                      !color.inStock && styles.outOfStockColor,
                    ]}
                    onPress={() => color.inStock && setSelectedColor(color)}
                    disabled={!color.inStock}
                    activeOpacity={0.7}
                  >
                    {selectedColor?.id === color.id && (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color={color.hex === '#000000' ? Colors.text.inverse : Colors.text.primary}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              {selectedColor && (
                <Text style={styles.selectedOptionText}>
                  Selected: {selectedColor.name}
                </Text>
              )}
            </View>
          </AnimatedView>

          {/* Size Selection */}
          <AnimatedView animation="slideUp" delay={1000}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Size</Text>
                <TouchableOpacity onPress={() => router.push('/size-guide')}>
                  <Text style={styles.sizeGuideLink}>Size Guide</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.sizeOptions}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size.id}
                    style={[
                      styles.sizeOption,
                      selectedSize?.id === size.id && styles.selectedSizeOption,
                      !size.inStock && styles.outOfStockSize,
                    ]}
                    onPress={() => size.inStock && setSelectedSize(size)}
                    disabled={!size.inStock}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.sizeOptionText,
                        selectedSize?.id === size.id && styles.selectedSizeOptionText,
                        !size.inStock && styles.outOfStockSizeText,
                      ]}
                    >
                      {size.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selectedSize && (
                <Text style={styles.selectedOptionText}>
                  Selected: {selectedSize.value}
                </Text>
              )}
            </View>
          </AnimatedView>

          {/* Quantity Selection */}
          <AnimatedView animation="slideUp" delay={1200}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                  activeOpacity={0.7}
                >
                  <Ionicons name="remove" size={20} color={Colors.text.primary} />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add" size={20} color={Colors.text.primary} />
                </TouchableOpacity>
              </View>
            </View>
          </AnimatedView>

          {/* Add to Cart Button */}
          <AnimatedView animation="slideUp" delay={1400}>
            <View style={styles.addToCartSection}>
              <Button
                title={`Add to Cart - ${formatPrice(product.price * quantity)}`}
                onPress={handleAddToCart}
                variant="primary"
                size="large"
                fullWidth
                disabled={!selectedSize || !selectedColor || !product.inStock}
              />

              {(!selectedSize || !selectedColor) && (
                <Text style={styles.selectionWarning}>
                  Please select size and color
                </Text>
              )}
            </View>
          </AnimatedView>
        </View>

        {/* Product Reviews */}
        <ProductReviews productId={product.id} />

        {/* Product Recommendations */}
        <ProductRecommendations currentProductId={product.id} />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  errorTitle: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  errorText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['3xl'],
  },
  imageGallery: {
    position: 'relative',
  },
  mainImage: {
    width: screenWidth,
    height: screenWidth * 1.2,
  },
  thumbnailContainer: {
    marginTop: Spacing.lg,
  },
  thumbnailContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: Spacing.radius.sm,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeThumbnail: {
    borderColor: Colors.primary.black,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  badgeContainer: {
    position: 'absolute',
    top: Spacing.lg,
    left: Spacing.lg,
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
    top: Spacing.lg,
    right: Spacing.lg,
  },
  productInfo: {
    padding: Spacing.xl,
  },
  headerSection: {
    marginBottom: Spacing['3xl'],
  },
  brandName: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    textTransform: 'uppercase',
    letterSpacing: Typography.letterSpacing.wide,
    marginBottom: Spacing.xs,
  },
  productName: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  price: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  originalPrice: {
    ...Typography.styles.body,
    color: Colors.text.tertiary,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: Colors.semantic.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Spacing.radius.sm,
  },
  discountText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    fontWeight: Typography.weights.bold,
    fontSize: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
  },
  section: {
    marginBottom: Spacing['3xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  description: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  sizeGuideLink: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    textDecorationLine: 'underline',
  },
  colorOptions: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColorOption: {
    borderColor: Colors.primary.black,
  },
  outOfStockColor: {
    opacity: 0.3,
  },
  sizeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  sizeOption: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: Spacing.radius.sm,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedSizeOption: {
    backgroundColor: Colors.primary.black,
    borderColor: Colors.primary.black,
  },
  outOfStockSize: {
    opacity: 0.3,
  },
  sizeOptionText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  selectedSizeOptionText: {
    color: Colors.text.inverse,
  },
  outOfStockSizeText: {
    color: Colors.text.tertiary,
  },
  selectedOptionText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: Spacing.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartSection: {
    marginTop: Spacing.xl,
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  selectionWarning: {
    ...Typography.styles.bodySmall,
    color: Colors.semantic.warning,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});
