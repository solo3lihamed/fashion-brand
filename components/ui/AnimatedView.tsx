import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { Animations } from '../../constants';

interface AnimatedViewProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'none';
  delay?: number;
  duration?: number;
  style?: ViewStyle;
  trigger?: boolean;
}

export const AnimatedView: React.FC<AnimatedViewProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = Animations.duration.normal,
  style,
  trigger = true,
}) => {
  const opacity = useSharedValue(animation === 'none' ? 1 : 0);
  const translateY = useSharedValue(
    animation === 'slideUp' ? 20 : 
    animation === 'slideDown' ? -20 : 0
  );
  const translateX = useSharedValue(
    animation === 'slideLeft' ? 20 : 
    animation === 'slideRight' ? -20 : 0
  );
  const scale = useSharedValue(animation === 'scaleIn' ? 0.9 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  useEffect(() => {
    if (trigger && animation !== 'none') {
      const animateIn = () => {
        opacity.value = withTiming(1, {
          duration,
          easing: Easing.out(Easing.cubic),
        });

        if (animation === 'slideUp' || animation === 'slideDown') {
          translateY.value = withSpring(0, Animations.spring.smooth);
        }

        if (animation === 'slideLeft' || animation === 'slideRight') {
          translateX.value = withSpring(0, Animations.spring.smooth);
        }

        if (animation === 'scaleIn') {
          scale.value = withSpring(1, Animations.spring.gentle);
        }
      };

      if (delay > 0) {
        setTimeout(animateIn, delay);
      } else {
        animateIn();
      }
    }
  }, [trigger, animation, delay, duration]);

  return (
    <Animated.View style={[animatedStyle, style]}>
      {children}
    </Animated.View>
  );
};
