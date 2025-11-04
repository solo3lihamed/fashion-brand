import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { AnimatedView } from '../ui/AnimatedView';
import { Button } from '../ui/Button';
import { Colors, Typography, Spacing } from '../../constants';

const { width: screenWidth } = Dimensions.get('window');

export const BrandStory: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textSection}>
          <AnimatedView animation="slideUp" delay={200}>
            <Text style={styles.subtitle}>Our Story</Text>
          </AnimatedView>
          
          <AnimatedView animation="slideUp" delay={400}>
            <Text style={styles.title}>Crafting Timeless Elegance</Text>
          </AnimatedView>
          
          <AnimatedView animation="slideUp" delay={600}>
            <Text style={styles.description}>
              Since our founding, we've been dedicated to creating fashion that transcends 
              trends. Each piece in our collection is carefully curated to embody the perfect 
              balance of contemporary style and timeless sophistication.
            </Text>
          </AnimatedView>
          
          <AnimatedView animation="slideUp" delay={800}>
            <Text style={styles.description}>
              From sustainable materials to ethical production practices, we believe that 
              true luxury lies in conscious choices that respect both our customers and 
              our planet.
            </Text>
          </AnimatedView>
          
          <AnimatedView animation="scaleIn" delay={1000}>
            <Button
              title="Learn More"
              onPress={() => router.push('/about' as any)}
              variant="outline"
              size="medium"
              style={styles.button}
            />
          </AnimatedView>
        </View>

        <AnimatedView animation="slideLeft" delay={300} style={styles.imageSection}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
            }}
            style={styles.image}
            contentFit="cover"
            transition={500}
          />
        </AnimatedView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['6xl'],
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing['4xl'],
    maxWidth: 1200,
    alignSelf: 'center',
  },
  textSection: {
    flex: 1,
    paddingRight: Spacing.xl,
  },
  imageSection: {
    flex: 1,
    aspectRatio: 4/5,
    borderRadius: Spacing.radius.lg,
    overflow: 'hidden',
    elevation: 4,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  subtitle: {
    ...Typography.styles.label,
    color: Colors.text.secondary,
    letterSpacing: Typography.letterSpacing.wider,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeights.tight * Typography.sizes['4xl'],
  },
  description: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing.xl,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  button: {
    alignSelf: 'flex-start',
    minWidth: 140,
  },
});
