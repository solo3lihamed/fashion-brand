import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { Layout } from '../components/layout';
import { AnimatedView } from '../components/ui/AnimatedView';
import { Colors, Typography, Spacing } from '../constants';

export default function About() {
  return (
    <Layout
      headerProps={{
        title: 'About Us',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount: 0,
      }}
      scrollable={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <AnimatedView animation="fadeIn" delay={200}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
              }}
              style={styles.heroImage}
              contentFit="cover"
            />
          </AnimatedView>
          
          <View style={styles.heroOverlay}>
            <AnimatedView animation="slideUp" delay={400}>
              <Text style={styles.heroTitle}>Our Story</Text>
            </AnimatedView>
            <AnimatedView animation="slideUp" delay={600}>
              <Text style={styles.heroSubtitle}>
                Crafting timeless fashion since 2020
              </Text>
            </AnimatedView>
          </View>
        </View>

        {/* Content Sections */}
        <View style={styles.contentContainer}>
          <AnimatedView animation="slideUp" delay={800}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Our Mission</Text>
              <Text style={styles.sectionText}>
                We believe that fashion should be both beautiful and sustainable. Our mission is to create 
                timeless pieces that transcend trends while respecting our planet and the people who make 
                our clothes possible.
              </Text>
            </View>
          </AnimatedView>

          <AnimatedView animation="slideUp" delay={1000}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quality & Craftsmanship</Text>
              <Text style={styles.sectionText}>
                Every piece in our collection is carefully crafted using premium materials and traditional 
                techniques. We work with skilled artisans who share our commitment to excellence and 
                attention to detail.
              </Text>
            </View>
          </AnimatedView>

          <AnimatedView animation="slideUp" delay={1200}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sustainability</Text>
              <Text style={styles.sectionText}>
                We're committed to reducing our environmental impact through sustainable practices, 
                ethical sourcing, and responsible production. Our goal is to create fashion that's 
                good for you and good for the planet.
              </Text>
            </View>
          </AnimatedView>

          <AnimatedView animation="slideUp" delay={1400}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Our Team</Text>
              <Text style={styles.sectionText}>
                Behind every collection is a passionate team of designers, craftspeople, and fashion 
                enthusiasts who are dedicated to bringing you the finest in contemporary style. 
                We're here to help you express your unique sense of style.
              </Text>
            </View>
          </AnimatedView>
        </View>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: Spacing['3xl'],
    alignItems: 'center',
  },
  heroTitle: {
    ...Typography.styles.h2,
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  heroSubtitle: {
    ...Typography.styles.body,
    color: Colors.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
  },
  contentContainer: {
    padding: Spacing['3xl'],
  },
  section: {
    marginBottom: Spacing['4xl'],
  },
  sectionTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  sectionText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
});
