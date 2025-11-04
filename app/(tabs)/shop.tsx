import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../../components/layout';
import { ProductGrid } from '../../components/shop/ProductGrid';
import { FilterBar } from '../../components/shop/FilterBar';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';

export default function Shop() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [filters, setFilters] = useState({
    category: '',
    sortBy: 'newest',
    priceRange: [0, 1000] as [number, number],
  });

  return (
    <Layout
      headerProps={{
        title: 'Shop',
        showBack: false,
        showCart: true,
        showSearch: true,
        cartItemCount,
      }}
      showFooter={false}
    >
      <View style={styles.container}>
        <FilterBar filters={filters} onFiltersChange={setFilters} />
        <ProductGrid filters={filters} />
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
});
