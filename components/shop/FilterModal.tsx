import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { AnimatedView } from '../ui/AnimatedView';
import { Button } from '../ui/Button';
import { Colors, Typography, Spacing } from '../../constants';
import { formatPrice } from '../../utils';

const { height: screenHeight } = Dimensions.get('window');

export interface FilterOptions {
  category: string;
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  sortBy: string;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onApplyFilters: (filters: FilterOptions) => void;
}

const categories = [
  { id: '', label: 'All Categories' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
];

const brands = [
  'Fashion Studio',
  'Luxury Brand',
  'Designer Label',
  'Premium Collection',
  'Elite Fashion',
];

const colors = [
  { id: 'black', name: 'Black', hex: '#000000' },
  { id: 'white', name: 'White', hex: '#FFFFFF' },
  { id: 'navy', name: 'Navy', hex: '#1e3a8a' },
  { id: 'gray', name: 'Gray', hex: '#6b7280' },
  { id: 'beige', name: 'Beige', hex: '#f5f5dc' },
  { id: 'brown', name: 'Brown', hex: '#8b4513' },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'price-low-high', label: 'Price: Low to High' },
  { id: 'price-high-low', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
  { id: 'popularity', label: 'Most Popular' },
];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onApplyFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      category: '',
      priceRange: [0, 1000],
      brands: [],
      colors: [],
      sizes: [],
      rating: 0,
      sortBy: 'newest',
    };
    setLocalFilters(resetFilters);
  };

  const toggleArrayFilter = (array: string[], value: string) => {
    return array.includes(value)
      ? array.filter(item => item !== value)
      : [...array, value];
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Sort By */}
          <AnimatedView animation="slideUp" delay={100}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.optionsGrid}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      localFilters.sortBy === option.id && styles.selectedOption,
                    ]}
                    onPress={() => setLocalFilters({ ...localFilters, sortBy: option.id })}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.sortBy === option.id && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </AnimatedView>

          {/* Category */}
          <AnimatedView animation="slideUp" delay={200}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.optionsGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.optionButton,
                      localFilters.category === category.id && styles.selectedOption,
                    ]}
                    onPress={() => setLocalFilters({ ...localFilters, category: category.id })}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.category === category.id && styles.selectedOptionText,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </AnimatedView>

          {/* Price Range */}
          <AnimatedView animation="slideUp" delay={300}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceLabel}>
                  {formatPrice(localFilters.priceRange[0])} - {formatPrice(localFilters.priceRange[1])}
                </Text>
                <View style={styles.sliderContainer}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={1000}
                    value={localFilters.priceRange[1]}
                    onValueChange={(value) =>
                      setLocalFilters({
                        ...localFilters,
                        priceRange: [localFilters.priceRange[0], Math.round(value)],
                      })
                    }
                    minimumTrackTintColor={Colors.primary.black}
                    maximumTrackTintColor={Colors.border.light}
                  />
                </View>
              </View>
            </View>
          </AnimatedView>

          {/* Brands */}
          <AnimatedView animation="slideUp" delay={400}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Brands</Text>
              <View style={styles.optionsGrid}>
                {brands.map((brand) => (
                  <TouchableOpacity
                    key={brand}
                    style={[
                      styles.optionButton,
                      localFilters.brands.includes(brand) && styles.selectedOption,
                    ]}
                    onPress={() =>
                      setLocalFilters({
                        ...localFilters,
                        brands: toggleArrayFilter(localFilters.brands, brand),
                      })
                    }
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.brands.includes(brand) && styles.selectedOptionText,
                      ]}
                    >
                      {brand}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </AnimatedView>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Apply Filters"
            onPress={handleApply}
            variant="primary"
            size="large"
            fullWidth
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  closeButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
  },
  resetButton: {
    padding: Spacing.sm,
  },
  resetText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  section: {
    paddingVertical: Spacing['3xl'],
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  optionButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.medium,
    borderRadius: Spacing.radius.full,
    backgroundColor: Colors.background.primary,
  },
  selectedOption: {
    backgroundColor: Colors.primary.black,
    borderColor: Colors.primary.black,
  },
  optionText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  selectedOptionText: {
    color: Colors.text.inverse,
  },
  priceRangeContainer: {
    gap: Spacing.lg,
  },
  priceLabel: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
    textAlign: 'center',
  },
  sliderContainer: {
    paddingHorizontal: Spacing.md,
  },
  slider: {
    width: '100%',
    height: 40,
  },

  footer: {
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
});
