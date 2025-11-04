import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '../../components/layout';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { Button } from '../../components/ui/Button';
import { useRouter } from 'expo-router';

export default function Cart() {
  const router = useRouter();
  const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
  const cartItemCount = getTotalItems();
  const totalPrice = getTotalPrice();

  const handleContinueShopping = () => {
    router.push('/(tabs)/shop');
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
                <Text style={styles.title}>Your Cart ({cartItemCount} items)</Text>
                <Text style={styles.subtitle}>
                  Cart functionality with item management coming soon...
                </Text>
                
                <View style={styles.totalSection}>
                  <Text style={styles.totalText}>
                    Total: ${totalPrice.toFixed(2)}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <Button
                    title="Clear Cart"
                    onPress={clearCart}
                    variant="outline"
                    size="medium"
                    style={styles.clearButton}
                  />
                  <Button
                    title="Checkout"
                    onPress={() => {}}
                    variant="primary"
                    size="large"
                    style={styles.checkoutButton}
                  />
                </View>
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
    marginBottom: Spacing.lg,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing['4xl'],
  },
  totalSection: {
    backgroundColor: Colors.background.secondary,
    padding: Spacing.xl,
    borderRadius: Spacing.radius.lg,
    marginBottom: Spacing['3xl'],
  },
  totalText: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    textAlign: 'center',
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
