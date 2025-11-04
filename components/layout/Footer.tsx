import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants';

export const Footer: React.FC = () => {
  const router = useRouter();

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Newsletter Section */}
      <View style={styles.newsletterSection}>
        <Text style={styles.newsletterTitle}>Stay in Style</Text>
        <Text style={styles.newsletterSubtitle}>
          Subscribe to get updates on new arrivals and exclusive offers
        </Text>
        <TouchableOpacity style={styles.subscribeButton} activeOpacity={0.8}>
          <Text style={styles.subscribeButtonText}>Subscribe</Text>
        </TouchableOpacity>
      </View>

      {/* Links Section */}
      <View style={styles.linksSection}>
        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Shop</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop?category=women' as any)}>
            <Text style={styles.linkText}>Women</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop?category=men' as any)}>
            <Text style={styles.linkText}>Men</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop?category=accessories' as any)}>
            <Text style={styles.linkText}>Accessories</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/shop?sale=true' as any)}>
            <Text style={styles.linkText}>Sale</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Help</Text>
          <TouchableOpacity onPress={() => router.push('/contact')}>
            <Text style={styles.linkText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/shipping')}>
            <Text style={styles.linkText}>Shipping Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/returns')}>
            <Text style={styles.linkText}>Returns</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/size-guide')}>
            <Text style={styles.linkText}>Size Guide</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.linkColumn}>
          <Text style={styles.columnTitle}>Company</Text>
          <TouchableOpacity onPress={() => router.push('/about')}>
            <Text style={styles.linkText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/careers')}>
            <Text style={styles.linkText}>Careers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/privacy')}>
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/terms')}>
            <Text style={styles.linkText}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Social Media Section */}
      <View style={styles.socialSection}>
        <Text style={styles.socialTitle}>Follow Us</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleSocialPress('https://instagram.com')}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-instagram" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleSocialPress('https://facebook.com')}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-facebook" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleSocialPress('https://twitter.com')}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-twitter" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialIcon}
            onPress={() => handleSocialPress('https://pinterest.com')}
            activeOpacity={0.7}
          >
            <Ionicons name="logo-pinterest" size={24} color={Colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Copyright Section */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © 2024 Fashion Store. All rights reserved.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.secondary,
    paddingTop: Spacing['6xl'],
    paddingBottom: Spacing['4xl'],
    paddingHorizontal: Spacing.lg,
  },
  newsletterSection: {
    alignItems: 'center',
    marginBottom: Spacing['5xl'],
  },
  newsletterTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  newsletterSubtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    maxWidth: 300,
  },
  subscribeButton: {
    backgroundColor: Colors.primary.black,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing['3xl'],
    borderRadius: Spacing.radius.sm,
  },
  subscribeButtonText: {
    ...Typography.styles.button,
    color: Colors.text.inverse,
  },
  linksSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing['5xl'],
  },
  linkColumn: {
    flex: 1,
  },
  columnTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  linkText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.md,
  },
  socialSection: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  socialTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  socialIcon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.radius.full,
    backgroundColor: Colors.background.primary,
  },
  copyrightSection: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
  },
  copyrightText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.tertiary,
  },
});
