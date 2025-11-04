import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AnimatedView } from '../ui/AnimatedView';
import { Colors, Typography, Spacing } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

interface Category {
  id: string;
  name: string;
  image: string;
  route: string;
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Women',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    route: '/(tabs)/shop?category=women',
  },
  {
    id: '2',
    name: 'Men',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    route: '/(tabs)/shop?category=men',
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    route: '/(tabs)/shop?category=accessories',
  },
];

export const Categories: React.FC = () => {
  const router = useRouter();

  const handleCategoryPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <AnimatedView animation="slideUp" delay={200}>
        <Text style={styles.title}>Shop by Category</Text>
      </AnimatedView>
      
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <AnimatedView
            key={category.id}
            animation="scaleIn"
            delay={400 + index * 100}
            style={styles.categoryWrapper}
          >
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => handleCategoryPress(category.route)}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: category.image }}
                style={styles.categoryImage}
                contentFit="cover"
                transition={300}
              />
              <View style={styles.categoryOverlay}>
                <Text style={styles.categoryName}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          </AnimatedView>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['6xl'],
    paddingHorizontal: Spacing.lg,
  },
  title: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing['4xl'],
  },
  categoriesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  categoryWrapper: {
    flex: 1,
  },
  categoryCard: {
    height: 200,
    borderRadius: Spacing.radius.lg,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
  },
  categoryName: {
    ...Typography.styles.h6,
    color: Colors.text.inverse,
    fontWeight: Typography.weights.semibold,
  },
});
