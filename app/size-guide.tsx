import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Layout } from '../components/layout';
import { AnimatedView } from '../components/ui/AnimatedView';
import { Colors, Typography, Spacing } from '../constants';
import { useCartStore } from '../store/cartStore';

const sizeData = {
  women: {
    clothing: [
      { size: 'XS', bust: '32-33', waist: '24-25', hips: '34-35', uk: '6', eu: '34' },
      { size: 'S', bust: '34-35', waist: '26-27', hips: '36-37', uk: '8', eu: '36' },
      { size: 'M', bust: '36-37', waist: '28-29', hips: '38-39', uk: '10', eu: '38' },
      { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42', uk: '12', eu: '40' },
      { size: 'XL', bust: '42-44', waist: '34-36', hips: '44-46', uk: '14', eu: '42' },
    ],
    shoes: [
      { us: '5', uk: '2.5', eu: '35', cm: '22' },
      { us: '5.5', uk: '3', eu: '35.5', cm: '22.5' },
      { us: '6', uk: '3.5', eu: '36', cm: '23' },
      { us: '6.5', uk: '4', eu: '37', cm: '23.5' },
      { us: '7', uk: '4.5', eu: '37.5', cm: '24' },
      { us: '7.5', uk: '5', eu: '38', cm: '24.5' },
      { us: '8', uk: '5.5', eu: '39', cm: '25' },
      { us: '8.5', uk: '6', eu: '39.5', cm: '25.5' },
      { us: '9', uk: '6.5', eu: '40', cm: '26' },
      { us: '9.5', uk: '7', eu: '41', cm: '26.5' },
      { us: '10', uk: '7.5', eu: '41.5', cm: '27' },
    ],
  },
  men: {
    clothing: [
      { size: 'XS', chest: '34-36', waist: '28-30', uk: '34', eu: '44' },
      { size: 'S', chest: '36-38', waist: '30-32', uk: '36', eu: '46' },
      { size: 'M', chest: '38-40', waist: '32-34', uk: '38', eu: '48' },
      { size: 'L', chest: '40-42', waist: '34-36', uk: '40', eu: '50' },
      { size: 'XL', chest: '42-44', waist: '36-38', uk: '42', eu: '52' },
      { size: 'XXL', chest: '44-46', waist: '38-40', uk: '44', eu: '54' },
    ],
    shoes: [
      { us: '7', uk: '6', eu: '40', cm: '25' },
      { us: '7.5', uk: '6.5', eu: '40.5', cm: '25.5' },
      { us: '8', uk: '7', eu: '41', cm: '26' },
      { us: '8.5', uk: '7.5', eu: '42', cm: '26.5' },
      { us: '9', uk: '8', eu: '42.5', cm: '27' },
      { us: '9.5', uk: '8.5', eu: '43', cm: '27.5' },
      { us: '10', uk: '9', eu: '44', cm: '28' },
      { us: '10.5', uk: '9.5', eu: '44.5', cm: '28.5' },
      { us: '11', uk: '10', eu: '45', cm: '29' },
      { us: '11.5', uk: '10.5', eu: '45.5', cm: '29.5' },
      { us: '12', uk: '11', eu: '46', cm: '30' },
    ],
  },
};

export default function SizeGuide() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [selectedCategory, setSelectedCategory] = useState<'women' | 'men'>('women');
  const [selectedType, setSelectedType] = useState<'clothing' | 'shoes'>('clothing');

  return (
    <Layout
      headerProps={{
        title: 'Size Guide',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      scrollable={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <AnimatedView animation="fadeIn" delay={200}>
          <View style={styles.header}>
            <Text style={styles.title}>Size Guide</Text>
            <Text style={styles.subtitle}>
              Find your perfect fit with our comprehensive sizing charts
            </Text>
          </View>
        </AnimatedView>

        {/* Category Selector */}
        <AnimatedView animation="slideUp" delay={400}>
          <View style={styles.selectorContainer}>
            <View style={styles.categorySelector}>
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  selectedCategory === 'women' && styles.activeSelectorButton,
                ]}
                onPress={() => setSelectedCategory('women')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedCategory === 'women' && styles.activeSelectorText,
                  ]}
                >
                  Women
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  selectedCategory === 'men' && styles.activeSelectorButton,
                ]}
                onPress={() => setSelectedCategory('men')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedCategory === 'men' && styles.activeSelectorText,
                  ]}
                >
                  Men
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  selectedType === 'clothing' && styles.activeSelectorButton,
                ]}
                onPress={() => setSelectedType('clothing')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedType === 'clothing' && styles.activeSelectorText,
                  ]}
                >
                  Clothing
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectorButton,
                  selectedType === 'shoes' && styles.activeSelectorButton,
                ]}
                onPress={() => setSelectedType('shoes')}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.selectorText,
                    selectedType === 'shoes' && styles.activeSelectorText,
                  ]}
                >
                  Shoes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedView>

        {/* Size Chart */}
        <AnimatedView animation="slideUp" delay={600}>
          <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>
              {selectedCategory === 'women' ? 'Women\'s' : 'Men\'s'} {' '}
              {selectedType === 'clothing' ? 'Clothing' : 'Shoes'} Sizes
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.table}>
                {/* Table Header */}
                <View style={styles.tableRow}>
                  {selectedType === 'clothing' ? (
                    selectedCategory === 'women' ? (
                      <>
                        <Text style={[styles.tableHeader, styles.firstColumn]}>Size</Text>
                        <Text style={styles.tableHeader}>Bust (in)</Text>
                        <Text style={styles.tableHeader}>Waist (in)</Text>
                        <Text style={styles.tableHeader}>Hips (in)</Text>
                        <Text style={styles.tableHeader}>UK</Text>
                        <Text style={styles.tableHeader}>EU</Text>
                      </>
                    ) : (
                      <>
                        <Text style={[styles.tableHeader, styles.firstColumn]}>Size</Text>
                        <Text style={styles.tableHeader}>Chest (in)</Text>
                        <Text style={styles.tableHeader}>Waist (in)</Text>
                        <Text style={styles.tableHeader}>UK</Text>
                        <Text style={styles.tableHeader}>EU</Text>
                      </>
                    )
                  ) : (
                    <>
                      <Text style={[styles.tableHeader, styles.firstColumn]}>US</Text>
                      <Text style={styles.tableHeader}>UK</Text>
                      <Text style={styles.tableHeader}>EU</Text>
                      <Text style={styles.tableHeader}>CM</Text>
                    </>
                  )}
                </View>

                {/* Table Rows */}
                {sizeData[selectedCategory][selectedType].map((row: any, index: number) => (
                  <View key={index} style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}>
                    {selectedType === 'clothing' ? (
                      selectedCategory === 'women' ? (
                        <>
                          <Text style={[styles.tableCell, styles.firstColumn]}>{row.size}</Text>
                          <Text style={styles.tableCell}>{row.bust}</Text>
                          <Text style={styles.tableCell}>{row.waist}</Text>
                          <Text style={styles.tableCell}>{row.hips}</Text>
                          <Text style={styles.tableCell}>{row.uk}</Text>
                          <Text style={styles.tableCell}>{row.eu}</Text>
                        </>
                      ) : (
                        <>
                          <Text style={[styles.tableCell, styles.firstColumn]}>{row.size}</Text>
                          <Text style={styles.tableCell}>{row.chest}</Text>
                          <Text style={styles.tableCell}>{row.waist}</Text>
                          <Text style={styles.tableCell}>{row.uk}</Text>
                          <Text style={styles.tableCell}>{row.eu}</Text>
                        </>
                      )
                    ) : (
                      <>
                        <Text style={[styles.tableCell, styles.firstColumn]}>{row.us}</Text>
                        <Text style={styles.tableCell}>{row.uk}</Text>
                        <Text style={styles.tableCell}>{row.eu}</Text>
                        <Text style={styles.tableCell}>{row.cm}</Text>
                      </>
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </AnimatedView>

        {/* Measurement Tips */}
        <AnimatedView animation="slideUp" delay={800}>
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>How to Measure</Text>

            {selectedType === 'clothing' ? (
              <View style={styles.tipsList}>
                {selectedCategory === 'women' ? (
                  <>
                    <View style={styles.tip}>
                      <Text style={styles.tipTitle}>Bust</Text>
                      <Text style={styles.tipText}>
                        Measure around the fullest part of your bust, keeping the tape parallel to the floor.
                      </Text>
                    </View>
                    <View style={styles.tip}>
                      <Text style={styles.tipTitle}>Waist</Text>
                      <Text style={styles.tipText}>
                        Measure around your natural waistline, keeping the tape comfortably loose.
                      </Text>
                    </View>
                    <View style={styles.tip}>
                      <Text style={styles.tipTitle}>Hips</Text>
                      <Text style={styles.tipText}>
                        Measure around the fullest part of your hips, about 7-9 inches below your waist.
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.tip}>
                      <Text style={styles.tipTitle}>Chest</Text>
                      <Text style={styles.tipText}>
                        Measure around the fullest part of your chest, keeping the tape parallel to the floor.
                      </Text>
                    </View>
                    <View style={styles.tip}>
                      <Text style={styles.tipTitle}>Waist</Text>
                      <Text style={styles.tipText}>
                        Measure around your natural waistline, where you normally wear your pants.
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ) : (
              <View style={styles.tipsList}>
                <View style={styles.tip}>
                  <Text style={styles.tipTitle}>Foot Length</Text>
                  <Text style={styles.tipText}>
                    Place your foot on a piece of paper and mark the longest toe and back of heel.
                    Measure the distance between the marks.
                  </Text>
                </View>
                <View style={styles.tip}>
                  <Text style={styles.tipTitle}>Best Time to Measure</Text>
                  <Text style={styles.tipText}>
                    Measure your feet at the end of the day when they are at their largest.
                  </Text>
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
  header: {
    padding: Spacing['4xl'],
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
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
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  selectorContainer: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  categorySelector: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xs,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xs,
  },
  selectorButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.radius.sm,
    alignItems: 'center',
  },
  activeSelectorButton: {
    backgroundColor: Colors.primary.black,
  },
  selectorText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    fontWeight: Typography.weights.medium,
  },
  activeSelectorText: {
    color: Colors.text.inverse,
  },
  chartContainer: {
    margin: Spacing.lg,
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xl,
    elevation: 2,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  chartTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
  table: {
    minWidth: 400,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    paddingVertical: Spacing.md,
  },
  alternateRow: {
    backgroundColor: Colors.background.secondary,
  },
  tableHeader: {
    ...Typography.styles.bodySmall,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
  tableCell: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
  firstColumn: {
    fontWeight: Typography.weights.medium,
    color: Colors.text.primary,
  },
  tipsContainer: {
    margin: Spacing.lg,
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing['4xl'],
  },
  tipsTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
  tipsList: {
    gap: Spacing.xl,
  },
  tip: {
    gap: Spacing.sm,
  },
  tipTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
  },
  tipText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
});
