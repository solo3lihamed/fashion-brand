import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Header } from './Header';
import { Footer } from './Footer';
import { Colors } from '../../constants';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  headerProps?: {
    title?: string;
    showBack?: boolean;
    showCart?: boolean;
    showSearch?: boolean;
    cartItemCount?: number;
  };
  scrollable?: boolean;
  backgroundColor?: string;
  contentStyle?: any;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  headerProps = {},
  scrollable = true,
  backgroundColor = Colors.background.primary,
  contentStyle,
}) => {
  const content = (
    <View style={[styles.content, { backgroundColor }, contentStyle]}>
      {children}
    </View>
  );

  return (
    <View style={styles.container}>
      {showHeader && <Header {...headerProps} />}
      
      {scrollable ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {content}
          {showFooter && <Footer />}
        </ScrollView>
      ) : (
        <>
          {content}
          {showFooter && <Footer />}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
  },
});
