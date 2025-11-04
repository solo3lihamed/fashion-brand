/**
 * Fashion Store Utility Functions
 */

// Price formatting
export const formatPrice = (price: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
};

// Calculate discount percentage
export const calculateDiscountPercentage = (originalPrice: number, salePrice: number): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Debounce function for search
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Validate email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

// Capitalize first letter
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Truncate text
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength).trim() + '...';
};

// Get initials from name
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Calculate cart total
export const calculateCartTotal = (items: any[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

// Check if item is in stock
export const isInStock = (product: any, selectedSize?: string, selectedColor?: string): boolean => {
  if (!product.inStock) return false;
  
  if (selectedSize) {
    const size = product.sizes.find((s: any) => s.id === selectedSize);
    if (!size || !size.inStock) return false;
  }
  
  if (selectedColor) {
    const color = product.colors.find((c: any) => c.id === selectedColor);
    if (!color || !color.inStock) return false;
  }
  
  return true;
};

// Generate product URL slug
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Get responsive image URL
export const getResponsiveImageUrl = (baseUrl: string, width: number): string => {
  return `${baseUrl}?w=${width}&q=80&f=webp`;
};

// Platform detection
export const isWeb = (): boolean => {
  return typeof window !== 'undefined';
};

export const isMobile = (): boolean => {
  if (!isWeb()) return true; // Assume mobile for React Native
  return window.innerWidth < 768;
};

export const isTablet = (): boolean => {
  if (!isWeb()) return false;
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

export const isDesktop = (): boolean => {
  if (!isWeb()) return false;
  return window.innerWidth >= 1024;
};

// Storage utilities
export const storage = {
  set: (key: string, value: any): void => {
    if (isWeb()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  get: (key: string): any => {
    if (isWeb()) {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },
  remove: (key: string): void => {
    if (isWeb()) {
      localStorage.removeItem(key);
    }
  },
};
