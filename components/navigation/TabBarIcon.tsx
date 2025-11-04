import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Animations } from '../../constants';

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  focused: boolean;
  badge?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  color,
  focused,
  badge,
}) => {
  const scale = useSharedValue(1);
  const badgeScale = useSharedValue(badge ? 1 : 0);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
    opacity: badgeScale.value,
  }));

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.1, Animations.spring.gentle);
    } else {
      scale.value = withSpring(1, Animations.spring.gentle);
    }
  }, [focused]);

  useEffect(() => {
    if (badge && badge > 0) {
      badgeScale.value = withSpring(1, Animations.spring.bouncy);
    } else {
      badgeScale.value = withTiming(0, { duration: Animations.duration.fast });
    }
  }, [badge]);

  return (
    <View style={styles.container}>
      <Animated.View style={animatedIconStyle}>
        <Ionicons
          name={name}
          size={24}
          color={color}
          style={styles.icon}
        />
      </Animated.View>
      
      {badge && badge > 0 && (
        <Animated.View style={[styles.badge, animatedBadgeStyle]}>
          <Text style={styles.badgeText}>
            {badge > 99 ? '99+' : badge.toString()}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  icon: {
    textAlign: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.primary.black,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: Colors.background.primary,
  },
  badgeText: {
    ...Typography.styles.caption,
    color: Colors.text.inverse,
    fontSize: 10,
    fontWeight: Typography.weights.bold,
    lineHeight: 12,
  },
});
