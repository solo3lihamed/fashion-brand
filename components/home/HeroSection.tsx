import React from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { AnimatedView } from '../ui/AnimatedView';
import { Button } from '../ui/Button';
import { Colors, Typography, Spacing } from '../../constants';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const HeroSection: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        >
          <View style={styles.content}>
            <AnimatedView animation="fadeIn" delay={300}>
              <Text style={styles.subtitle}>New Collection</Text>
            </AnimatedView>
            
            <AnimatedView animation="slideUp" delay={500}>
              <Text style={styles.title}>Elevate Your{'\n'}Style</Text>
            </AnimatedView>
            
            <AnimatedView animation="slideUp" delay={700}>
              <Text style={styles.description}>
                Discover our curated selection of premium fashion pieces
                that define contemporary elegance
              </Text>
            </AnimatedView>
            
            <AnimatedView animation="scaleIn" delay={900}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Shop Now"
                  onPress={() => router.push('/(tabs)/shop' as any)}
                  variant="primary"
                  size="large"
                  style={styles.primaryButton}
                />
                <Button
                  title="Explore"
                  onPress={() => router.push('/(tabs)/shop' as any)}
                  variant="outline"
                  size="large"
                  style={styles.secondaryButton}
                  textStyle={styles.secondaryButtonText}
                />
              </View>
            </AnimatedView>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.85,
    width: screenWidth,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    maxWidth: 400,
  },
  subtitle: {
    ...Typography.styles.label,
    color: Colors.text.inverse,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
    opacity: 0.9,
  },
  title: {
    ...Typography.styles.h1,
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    lineHeight: Typography.sizes['5xl'],
  },
  description: {
    ...Typography.styles.body,
    color: Colors.text.inverse,
    textAlign: 'center',
    marginBottom: Spacing['4xl'],
    opacity: 0.9,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
    width: '100%',
    justifyContent: 'center',
  },
  primaryButton: {
    flex: 1,
    maxWidth: 140,
  },
  secondaryButton: {
    flex: 1,
    maxWidth: 140,
    backgroundColor: 'transparent',
    borderColor: Colors.text.inverse,
  },
  secondaryButtonText: {
    color: Colors.text.inverse,
  },
});
