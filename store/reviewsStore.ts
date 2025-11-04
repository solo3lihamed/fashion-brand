import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  images?: string[];
}

interface ReviewsStore {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  getProductReviews: (productId: string) => Review[];
  getAverageRating: (productId: string) => number;
  getReviewCount: (productId: string) => number;
  markHelpful: (reviewId: string) => void;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Perfect fit and beautiful quality!',
    comment: 'This dress exceeded my expectations. The silk is luxurious and the fit is perfect. I received so many compliments!',
    date: new Date('2024-01-15'),
    verified: true,
    helpful: 12,
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Emma K.',
    rating: 4,
    title: 'Great dress, runs slightly small',
    comment: 'Love the style and quality, but I would recommend sizing up. The material is beautiful and drapes well.',
    date: new Date('2024-01-10'),
    verified: true,
    helpful: 8,
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Jessica L.',
    rating: 5,
    title: 'Incredibly soft cashmere',
    comment: 'This sweater is so soft and warm. Perfect for layering or wearing alone. Worth every penny!',
    date: new Date('2024-01-12'),
    verified: true,
    helpful: 15,
  },
];

export const useReviewsStore = create<ReviewsStore>()(
  persist(
    (set, get) => ({
      reviews: mockReviews,
      
      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          date: new Date(),
          helpful: 0,
        };
        
        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));
      },
      
      getProductReviews: (productId: string) => {
        return get().reviews
          .filter(review => review.productId === productId)
          .sort((a, b) => b.date.getTime() - a.date.getTime());
      },
      
      getAverageRating: (productId: string) => {
        const productReviews = get().reviews.filter(review => review.productId === productId);
        if (productReviews.length === 0) return 0;
        
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        return Math.round((totalRating / productReviews.length) * 10) / 10;
      },
      
      getReviewCount: (productId: string) => {
        return get().reviews.filter(review => review.productId === productId).length;
      },
      
      markHelpful: (reviewId: string) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          ),
        }));
      },
    }),
    {
      name: 'reviews-storage',
      storage: createJSONStorage(() => ({
        getItem: (name) => {
          if (typeof window !== 'undefined') {
            return localStorage.getItem(name);
          }
          return null;
        },
        setItem: (name, value) => {
          if (typeof window !== 'undefined') {
            localStorage.setItem(name, value);
          }
        },
        removeItem: (name) => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem(name);
          }
        },
      })),
    }
  )
);
