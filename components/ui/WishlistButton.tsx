import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Spacing, Animations } from '../../constants';
import { useWishlistStore } from '../../store/wishlistStore';
import { Product } from '../../types';

interface WishlistButtonProps {
  product: Product;
  size?: number;
  style?: any;
  showBackground?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  size = 24,
  style,
  showBackground = true,
}) => {
  const { addItem, removeItem, isInWishlist } = useWishlistStore();
  const isWishlisted = isInWishlist(product.id);
  
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handlePress = () => {
    // Button press animation
    scale.value = withSequence(
      withSpring(0.9, Animations.spring.gentle),
      withSpring(1, Animations.spring.gentle)
    );

    // Heart animation
    heartScale.value = withSequence(
      withSpring(1.3, Animations.spring.bouncy),
      withSpring(1, Animations.spring.gentle)
    );

    // Toggle wishlist
    if (isWishlisted) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  // Animate heart when wishlist status changes
  useEffect(() => {
    if (isWishlisted) {
      heartScale.value = withSequence(
        withSpring(1.2, Animations.spring.bouncy),
        withSpring(1, Animations.spring.gentle)
      );
    }
  }, [isWishlisted]);

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.container,
        showBackground && styles.backgroundContainer,
        animatedStyle,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Animated.View style={heartAnimatedStyle}>
        <Ionicons
          name={isWishlisted ? 'heart' : 'heart-outline'}
          size={size}
          color={isWishlisted ? Colors.semantic.error : Colors.text.primary}
        />
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  backgroundContainer: {
    backgroundColor: Colors.background.overlayLight,
    borderRadius: Spacing.radius.full,
    width: 44,
    height: 44,
  },
});
