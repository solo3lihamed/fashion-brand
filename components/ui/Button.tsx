import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming 
} from 'react-native-reanimated';
import { Colors, Typography, Spacing, Animations } from '../../constants';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, Animations.spring.gentle);
    opacity.value = withTiming(0.8, { duration: Animations.duration.fast });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, Animations.spring.gentle);
    opacity.value = withTiming(1, { duration: Animations.duration.fast });
  };

  const getButtonStyle = (): ViewStyle => {
    const baseStyle = styles.button;
    const sizeStyle = styles[`${size}Button`];
    const variantStyle = styles[`${variant}Button`];
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      ...(fullWidth && { width: '100%' }),
      ...(disabled && styles.disabledButton),
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle = styles.buttonText;
    const sizeStyle = styles[`${size}ButtonText`];
    const variantStyle = styles[`${variant}ButtonText`];
    
    return {
      ...baseStyle,
      ...sizeStyle,
      ...variantStyle,
      ...(disabled && styles.disabledButtonText),
    };
  };

  return (
    <AnimatedTouchableOpacity
      style={[animatedStyle, getButtonStyle(), style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={1}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {loading ? 'Loading...' : title}
      </Text>
    </AnimatedTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Spacing.radius.sm,
    borderWidth: 1,
  },
  
  // Size variants
  smallButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    minHeight: 36,
  },
  mediumButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    minHeight: 44,
  },
  largeButton: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing['2xl'],
    minHeight: 52,
  },

  // Color variants
  primaryButton: {
    backgroundColor: Colors.primary.black,
    borderColor: Colors.primary.black,
  },
  secondaryButton: {
    backgroundColor: Colors.background.primary,
    borderColor: Colors.primary.black,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: Colors.border.medium,
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  // Disabled state
  disabledButton: {
    backgroundColor: Colors.primary.lightGray,
    borderColor: Colors.primary.lightGray,
  },

  // Text styles
  buttonText: {
    textAlign: 'center',
    fontWeight: Typography.weights.medium,
  },
  
  // Size text variants
  smallButtonText: {
    ...Typography.styles.buttonSmall,
  },
  mediumButtonText: {
    ...Typography.styles.button,
  },
  largeButtonText: {
    ...Typography.styles.button,
    fontSize: Typography.sizes.lg,
  },

  // Color text variants
  primaryButtonText: {
    color: Colors.text.inverse,
  },
  secondaryButtonText: {
    color: Colors.text.primary,
  },
  outlineButtonText: {
    color: Colors.text.primary,
  },
  ghostButtonText: {
    color: Colors.text.primary,
  },

  // Disabled text
  disabledButtonText: {
    color: Colors.text.tertiary,
  },
});
