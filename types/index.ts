/**
 * Fashion Store Type Definitions
 */

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  sizes: Size[];
  colors: Color[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isSale?: boolean;
  rating?: number;
  reviewCount?: number;
  tags: string[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
  inStock: boolean;
}

export interface Color {
  id: string;
  name: string;
  hex: string;
  inStock: boolean;
}

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: Size;
  color: Color;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
}

// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  addresses: Address[];
  preferences: UserPreferences;
  createdAt: Date;
}

export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  smsUpdates: boolean;
  preferredSizes: string[];
  favoriteCategories: string[];
}

// Order Types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  status: OrderStatus;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

// Filter and Sort Types
export interface ProductFilters {
  category?: string;
  subcategory?: string;
  brand?: string[];
  priceRange?: [number, number];
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
}

export type SortOption = 
  | 'newest'
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'
  | 'rating'
  | 'popularity';

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Component Props Types
export interface BaseComponentProps {
  style?: any;
  testID?: string;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  animationDelay?: number;
  animationDuration?: number;
}
