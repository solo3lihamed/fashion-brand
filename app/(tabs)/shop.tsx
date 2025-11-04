import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../../components/layout';
import { ProductGrid } from '../../components/shop/ProductGrid';
import { FilterBar } from '../../components/shop/FilterBar';
import { FilterModal, FilterOptions } from '../../components/shop/FilterModal';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';

export default function Shop() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    category: '',
    priceRange: [0, 1000],
    brands: [],
    colors: [],
    sizes: [],
    rating: 0,
    sortBy: 'newest',
  });

  const handleApplyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

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
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          onOpenFilterModal={() => setShowFilterModal(true)}
        />
        <ProductGrid filters={filters} />

        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          filters={filters}
          onApplyFilters={handleApplyFilters}
        />
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
