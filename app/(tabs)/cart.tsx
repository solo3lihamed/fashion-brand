import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '../../components/layout';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'expo-router';
import { formatPrice } from '../../utils';
import { CartItem } from '../../types';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

const CartItemComponent: React.FC<CartItemComponentProps> = ({
  item,
  onUpdateQuantity,
  onRemove
}) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      Alert.alert(
        'Remove Item',
        'Are you sure you want to remove this item from your cart?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => onRemove(item.id) },
        ]
      );
    } else {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <AnimatedView animation="slideUp" style={styles.cartItem}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.itemImage}
        contentFit="cover"
      />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.product.name}
        </Text>
        <Text style={styles.itemBrand}>{item.product.brand}</Text>

        <View style={styles.itemOptions}>
          <Text style={styles.optionText}>
            Size: {item.size.name} • Color: {item.color.name}
          </Text>
        </View>

        <View style={styles.itemFooter}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color={Colors.text.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={Colors.text.primary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.itemPrice}>
            {formatPrice(item.product.price * item.quantity)}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => onRemove(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={20} color={Colors.text.tertiary} />
      </TouchableOpacity>
    </AnimatedView>
  );
};

export default function Cart() {
  const router = useRouter();
  const { items, getTotalItems, getTotalPrice, clearCart, updateQuantity, removeItem } = useCartStore();
  const cartItemCount = getTotalItems();
  const totalPrice = getTotalPrice();
  const subtotal = totalPrice;
  const shipping = totalPrice > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // 8% tax
  const finalTotal = subtotal + shipping + tax;

  const handleContinueShopping = () => {
    router.push('/(tabs)/shop');
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Checkout functionality will be implemented soon!',
      [{ text: 'OK' }]
    );
  };

  return (
    <Layout
      headerProps={{
        title: 'Shopping Cart',
        showBack: false,
        showCart: false,
        showSearch: false,
        cartItemCount,
      }}
      showFooter={false}
      scrollable={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <AnimatedView animation="fadeIn" delay={200}>
          <View style={styles.content}>
            {items.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
                <Text style={styles.emptySubtitle}>
                  Discover our curated collection and add items to your cart
                </Text>
                <Button
                  title="Continue Shopping"
                  onPress={handleContinueShopping}
                  variant="primary"
                  size="large"
                  style={styles.continueButton}
                />
              </View>
            ) : (
              <View style={styles.cartContent}>
                <AnimatedView animation="slideUp" delay={200}>
                  <Text style={styles.title}>Your Cart ({cartItemCount} items)</Text>
                </AnimatedView>

                {/* Cart Items */}
                <View style={styles.itemsList}>
                  {items.map((item, index) => (
                    <CartItemComponent
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  ))}
                </View>

                {/* Order Summary */}
                <AnimatedView animation="slideUp" delay={400}>
                  <View style={styles.summarySection}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Subtotal</Text>
                      <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Shipping</Text>
                      <Text style={styles.summaryValue}>
                        {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                      </Text>
                    </View>

                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Tax</Text>
                      <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
                    </View>

                    <View style={[styles.summaryRow, styles.totalRow]}>
                      <Text style={styles.totalLabel}>Total</Text>
                      <Text style={styles.totalValue}>{formatPrice(finalTotal)}</Text>
                    </View>

                    {shipping > 0 && (
                      <Text style={styles.freeShippingNote}>
                        Add {formatPrice(100 - subtotal)} more for free shipping
                      </Text>
                    )}
                  </View>
                </AnimatedView>

                {/* Actions */}
                <AnimatedView animation="slideUp" delay={600}>
                  <View style={styles.actions}>
                    <Button
                      title="Clear Cart"
                      onPress={handleClearCart}
                      variant="outline"
                      size="medium"
                      style={styles.clearButton}
                    />
                    <Button
                      title={`Checkout - ${formatPrice(finalTotal)}`}
                      onPress={handleCheckout}
                      variant="primary"
                      size="large"
                      style={styles.checkoutButton}
                    />
                  </View>
                </AnimatedView>
              </View>
            )}
          </View>
        </AnimatedView>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
    paddingVertical: Spacing['6xl'],
  },
  emptyTitle: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  emptySubtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['4xl'],
    maxWidth: 300,
  },
  continueButton: {
    minWidth: 200,
  },
  cartContent: {
    paddingVertical: Spacing.xl,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
  },
  itemsList: {
    marginBottom: Spacing['4xl'],
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
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
  itemOptions: {
    marginBottom: Spacing.md,
  },
  optionText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.tertiary,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: Spacing.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
    minWidth: 20,
    textAlign: 'center',
  },
  itemPrice: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  removeButton: {
    padding: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  summarySection: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.xl,
    borderRadius: Spacing.radius.lg,
    marginBottom: Spacing['3xl'],
  },
  summaryTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  summaryValue: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    paddingTop: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: 0,
  },
  totalLabel: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
  },
  totalValue: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  freeShippingNote: {
    ...Typography.styles.bodySmall,
    color: Colors.accent.sage,
    textAlign: 'center',
    marginTop: Spacing.md,
    fontStyle: 'italic',
  },
  actions: {
    gap: Spacing.lg,
  },
  clearButton: {
    marginBottom: Spacing.md,
  },
  checkoutButton: {
    width: '100%',
  },
});
