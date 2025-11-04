import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../constants';

interface FilterBarProps {
  filters: {
    category: string;
    sortBy: string;
    priceRange: [number, number];
  };
  onFiltersChange: (filters: any) => void;
}

const categories = [
  { id: '', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
];

const sortOptions = [
  { id: 'newest', label: 'Newest' },
  { id: 'price-low-high', label: 'Price: Low to High' },
  { id: 'price-high-low', label: 'Price: High to Low' },
  { id: 'name-a-z', label: 'Name: A-Z' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  const handleCategoryChange = (category: string) => {
    onFiltersChange({ ...filters, category });
  };

  const handleSortChange = (sortBy: string) => {
    onFiltersChange({ ...filters, sortBy });
  };

  return (
    <View style={styles.container}>
      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              filters.category === category.id && styles.activeCategoryButton,
            ]}
            onPress={() => handleCategoryChange(category.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryText,
                filters.category === category.id && styles.activeCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sort and Filter Controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
          <Ionicons name="funnel-outline" size={18} color={Colors.text.primary} />
          <Text style={styles.controlText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
          <Ionicons name="swap-vertical-outline" size={18} color={Colors.text.primary} />
          <Text style={styles.controlText}>Sort</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} activeOpacity={0.7}>
          <Ionicons name="grid-outline" size={18} color={Colors.text.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  categoriesContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Spacing.radius.full,
    backgroundColor: Colors.background.secondary,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  activeCategoryButton: {
    backgroundColor: Colors.primary.black,
    borderColor: Colors.primary.black,
  },
  categoryText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  activeCategoryText: {
    color: Colors.text.inverse,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  controlText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
});
