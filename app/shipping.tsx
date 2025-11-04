import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components/layout';
import { Colors, Typography, Spacing } from '../constants';

export default function Shipping() {
  return (
    <Layout
      headerProps={{
        title: 'Shipping Info',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount: 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Shipping Information</Text>
        <Text style={styles.subtitle}>Shipping details coming soon...</Text>
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
