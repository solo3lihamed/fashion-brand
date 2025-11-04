import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing } from '../../constants';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  cartItemCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showCart = true,
  showSearch = true,
  cartItemCount = 0,
}) => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {/* Left Section */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/(tabs)/' as any)}
              activeOpacity={0.7}
            >
              <Ionicons name="menu" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Section */}
        <View style={styles.centerSection}>
          {title ? (
            <Text style={styles.title}>{title}</Text>
          ) : (
            <Text style={styles.logo}>FASHION</Text>
          )}
        </View>

        {/* Right Section */}
        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/(tabs)/search' as any)}
              activeOpacity={0.7}
            >
              <Ionicons name="search" size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          )}

          {showCart && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push('/(tabs)/cart' as any)}
              activeOpacity={0.7}
            >
              <Ionicons name="bag-outline" size={24} color={Colors.text.primary} />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Spacing.layout.headerHeight,
    paddingHorizontal: Spacing.lg,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  logo: {
    ...Typography.styles.h5,
    fontWeight: Typography.weights.bold,
    color: Colors.text.primary,
    letterSpacing: Typography.letterSpacing.wider,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: Colors.primary.black,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: Typography.weights.bold,
  },
});
