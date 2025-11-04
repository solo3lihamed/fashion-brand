import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components/layout';
import { Colors, Typography, Spacing } from '../constants';

export default function Careers() {
  return (
    <Layout
      headerProps={{
        title: 'Careers',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount: 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Careers</Text>
        <Text style={styles.subtitle}>Join our team - opportunities coming soon...</Text>
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
