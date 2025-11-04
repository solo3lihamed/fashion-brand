import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Layout } from '../../components/layout';
import { Colors, Typography, Spacing } from '../../constants';
import { useCartStore } from '../../store/cartStore';
import { AnimatedView } from '../../components/ui/AnimatedView';
import { Button } from '../../components/ui/Button';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  showArrow?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  title, 
  subtitle, 
  onPress, 
  showArrow = true 
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.menuItemLeft}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={20} color={Colors.text.primary} />
      </View>
      <View style={styles.menuItemText}>
        <Text style={styles.menuItemTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {showArrow && (
      <Ionicons name="chevron-forward" size={20} color={Colors.text.tertiary} />
    )}
  </TouchableOpacity>
);

export default function Profile() {
  const router = useRouter();
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  const handleMenuPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <Layout
      headerProps={{
        title: 'Profile',
        showBack: false,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      showFooter={false}
      scrollable={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <AnimatedView animation="fadeIn" delay={200}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={40} color={Colors.text.inverse} />
            </View>
            <Text style={styles.welcomeText}>Welcome Back!</Text>
            <Text style={styles.signInText}>Sign in to access your account</Text>
            
            <View style={styles.authButtons}>
              <Button
                title="Sign In"
                onPress={() => {}}
                variant="primary"
                size="medium"
                style={styles.signInButton}
              />
              <Button
                title="Create Account"
                onPress={() => {}}
                variant="outline"
                size="medium"
                style={styles.createAccountButton}
              />
            </View>
          </View>
        </AnimatedView>

        {/* Menu Items */}
        <AnimatedView animation="slideUp" delay={400}>
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <MenuItem
              icon="person-outline"
              title="Personal Information"
              subtitle="Manage your profile details"
              onPress={() => handleMenuPress('/profile/personal')}
            />
            
            <MenuItem
              icon="location-outline"
              title="Addresses"
              subtitle="Manage shipping addresses"
              onPress={() => handleMenuPress('/profile/addresses')}
            />
            
            <MenuItem
              icon="card-outline"
              title="Payment Methods"
              subtitle="Manage payment options"
              onPress={() => handleMenuPress('/profile/payment')}
            />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={600}>
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>Orders & Support</Text>
            
            <MenuItem
              icon="receipt-outline"
              title="Order History"
              subtitle="View past orders"
              onPress={() => handleMenuPress('/profile/orders')}
            />
            
            <MenuItem
              icon="heart-outline"
              title="Wishlist"
              subtitle="Saved items"
              onPress={() => handleMenuPress('/profile/wishlist')}
            />
            
            <MenuItem
              icon="help-circle-outline"
              title="Help & Support"
              onPress={() => handleMenuPress('/contact')}
            />
          </View>
        </AnimatedView>

        <AnimatedView animation="slideUp" delay={800}>
          <View style={styles.menuSection}>
            <Text style={styles.sectionTitle}>About</Text>
            
            <MenuItem
              icon="information-circle-outline"
              title="About Us"
              onPress={() => handleMenuPress('/about')}
            />
            
            <MenuItem
              icon="document-text-outline"
              title="Terms & Privacy"
              onPress={() => handleMenuPress('/terms')}
            />
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
  profileHeader: {
    alignItems: 'center',
    padding: Spacing['4xl'],
    backgroundColor: Colors.background.secondary,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  welcomeText: {
    ...Typography.styles.h3,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  signInText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing['3xl'],
  },
  authButtons: {
    flexDirection: 'row',
    gap: Spacing.lg,
    width: '100%',
    maxWidth: 300,
  },
  signInButton: {
    flex: 1,
  },
  createAccountButton: {
    flex: 1,
  },
  menuSection: {
    paddingVertical: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    marginHorizontal: Spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background.primary,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  menuItemSubtitle: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});
