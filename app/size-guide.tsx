import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components/layout';
import { Colors, Typography, Spacing } from '../constants';

export default function SizeGuide() {
  return (
    <Layout
      headerProps={{
        title: 'Size Guide',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount: 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Size Guide</Text>
        <Text style={styles.subtitle}>Sizing information coming soon...</Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
