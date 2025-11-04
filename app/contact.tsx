import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '../components/layout';
import { Colors, Typography, Spacing } from '../constants';

export default function Contact() {
  return (
    <Layout
      headerProps={{
        title: 'Contact Us',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount: 0,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Contact Us</Text>
        <Text style={styles.subtitle}>Get in touch with our team</Text>
        <Text style={styles.description}>
          Contact form and information coming soon...
        </Text>
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
    ...Typography.styles.h5,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
  },
  description: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});
