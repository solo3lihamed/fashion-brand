import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Layout } from '../components/layout';
import { AnimatedView } from '../components/ui/AnimatedView';
import { Button } from '../components/ui/Button';
import { Colors, Typography, Spacing } from '../constants';
import { useCartStore } from '../store/cartStore';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Message Sent!',
        'Thank you for contacting us. We\'ll get back to you within 24 hours.',
        [{ text: 'OK', onPress: () => {
          setFormData({ name: '', email: '', subject: '', message: '' });
        }}]
      );
    }, 1500);
  };

  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:hello@fashionstore.com');
  };

  const handleLocation = () => {
    Linking.openURL('https://maps.google.com/?q=Fashion+Store+NYC');
  };

  return (
    <Layout
      headerProps={{
        title: 'Contact Us',
        showBack: true,
        showCart: true,
        showSearch: false,
        cartItemCount,
      }}
      scrollable={false}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <AnimatedView animation="fadeIn" delay={200}>
          <View style={styles.header}>
            <Text style={styles.title}>Get in Touch</Text>
            <Text style={styles.subtitle}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </View>
        </AnimatedView>

        {/* Contact Methods */}
        <AnimatedView animation="slideUp" delay={400}>
          <View style={styles.contactMethods}>
            <TouchableOpacity style={styles.contactMethod} onPress={handleCall} activeOpacity={0.7}>
              <View style={styles.contactIcon}>
                <Ionicons name="call" size={24} color={Colors.primary.black} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Phone</Text>
                <Text style={styles.contactDetail}>+1 (234) 567-8900</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactMethod} onPress={handleEmail} activeOpacity={0.7}>
              <View style={styles.contactIcon}>
                <Ionicons name="mail" size={24} color={Colors.primary.black} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Email</Text>
                <Text style={styles.contactDetail}>hello@fashionstore.com</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactMethod} onPress={handleLocation} activeOpacity={0.7}>
              <View style={styles.contactIcon}>
                <Ionicons name="location" size={24} color={Colors.primary.black} />
              </View>
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>Address</Text>
                <Text style={styles.contactDetail}>123 Fashion Ave, New York, NY 10001</Text>
              </View>
            </TouchableOpacity>
          </View>
        </AnimatedView>

        {/* Contact Form */}
        <AnimatedView animation="slideUp" delay={600}>
          <View style={styles.formSection}>
            <Text style={styles.formTitle}>Send us a Message</Text>

            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Name *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Your full name"
                  placeholderTextColor={Colors.text.tertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="your.email@example.com"
                  placeholderTextColor={Colors.text.tertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={formData.subject}
                  onChangeText={(value) => handleInputChange('subject', value)}
                  placeholder="What is this regarding?"
                  placeholderTextColor={Colors.text.tertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Message *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={formData.message}
                  onChangeText={(value) => handleInputChange('message', value)}
                  placeholder="Tell us how we can help you..."
                  placeholderTextColor={Colors.text.tertiary}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <Button
                title={isSubmitting ? 'Sending...' : 'Send Message'}
                onPress={handleSubmit}
                variant="primary"
                size="large"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </View>
          </View>
        </AnimatedView>

        {/* Business Hours */}
        <AnimatedView animation="slideUp" delay={800}>
          <View style={styles.hoursSection}>
            <Text style={styles.hoursTitle}>Business Hours</Text>
            <View style={styles.hoursGrid}>
              <View style={styles.hoursRow}>
                <Text style={styles.dayText}>Monday - Friday</Text>
                <Text style={styles.timeText}>9:00 AM - 8:00 PM</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.dayText}>Saturday</Text>
                <Text style={styles.timeText}>10:00 AM - 6:00 PM</Text>
              </View>
              <View style={styles.hoursRow}>
                <Text style={styles.dayText}>Sunday</Text>
                <Text style={styles.timeText}>12:00 PM - 5:00 PM</Text>
              </View>
            </View>
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
  header: {
    padding: Spacing['4xl'],
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
  },
  title: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
  },
  contactMethods: {
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    padding: Spacing.xl,
    borderRadius: Spacing.radius.lg,
    elevation: 2,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  contactIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.lg,
  },
  contactInfo: {
    flex: 1,
  },
  contactTitle: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  contactDetail: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
  formSection: {
    padding: Spacing.xl,
    backgroundColor: Colors.background.secondary,
    marginHorizontal: Spacing.lg,
    borderRadius: Spacing.radius.lg,
    marginBottom: Spacing.xl,
  },
  formTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
  form: {
    gap: Spacing.xl,
  },
  inputGroup: {
    gap: Spacing.sm,
  },
  label: {
    ...Typography.styles.label,
    color: Colors.text.primary,
  },
  input: {
    backgroundColor: Colors.background.primary,
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: Spacing.radius.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    ...Typography.styles.body,
    color: Colors.text.primary,
    minHeight: 48,
  },
  textArea: {
    minHeight: 120,
    paddingTop: Spacing.md,
  },
  hoursSection: {
    padding: Spacing.xl,
    marginBottom: Spacing['4xl'],
  },
  hoursTitle: {
    ...Typography.styles.h5,
    color: Colors.text.primary,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  hoursGrid: {
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  timeText: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
  },
});
