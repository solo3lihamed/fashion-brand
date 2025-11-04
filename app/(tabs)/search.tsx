import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Layout } from '../../components/layout';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { AnimatedView } from '../../components/ui/AnimatedView';

export default function Search() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout
      headerProps={{
        title: 'Search',
        showBack: false,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      showFooter={false}
      scrollable={false}
    >
      <View style={styles.container}>
        <AnimatedView animation="slideDown" delay={200}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor={Colors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus={false}
            />
          </View>
        </AnimatedView>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <AnimatedView animation="fadeIn" delay={400}>
            <View style={styles.emptyState}>
              <Text style={styles.title}>Discover Fashion</Text>
              <Text style={styles.subtitle}>
                Search through our curated collection of premium fashion pieces
              </Text>
              
              {searchQuery.length > 0 && (
                <View style={styles.searchResults}>
                  <Text style={styles.resultsText}>
                    Searching for "{searchQuery}"...
                  </Text>
                  <Text style={styles.comingSoon}>
                    Search functionality coming soon!
                  </Text>
                </View>
              )}
            </View>
          </AnimatedView>
        </ScrollView>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  searchContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  searchInput: {
    height: 48,
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    paddingHorizontal: Spacing.lg,
    ...Typography.styles.body,
    color: Colors.text.primary,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing['4xl'],
    minHeight: 400,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['3xl'],
  },
  searchResults: {
    alignItems: 'center',
    marginTop: Spacing.xl,
  },
  resultsText: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  comingSoon: {
    ...Typography.styles.bodySmall,
    color: Colors.text.tertiary,
    fontStyle: 'italic',
  },
});
