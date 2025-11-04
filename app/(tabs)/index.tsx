import React from 'react';
import { Layout } from '../../components/layout';
import { HeroSection } from '../../components/home/HeroSection';
import { FeaturedProducts } from '../../components/home/FeaturedProducts';
import { BrandStory } from '../../components/home/BrandStory';
import { Categories } from '../../components/home/Categories';
import { useCartStore } from '../../store/cartStore';

export default function Index() {
  const cartItemCount = useCartStore((state) => state.getTotalItems());

  return (
    <Layout
      headerProps={{
        showBack: false,
        showCart: true,
        showSearch: true,
        cartItemCount,
      }}
      showFooter={true}
    >
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <BrandStory />
    </Layout>
  );
}
