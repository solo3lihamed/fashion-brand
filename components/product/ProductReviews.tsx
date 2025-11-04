import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AnimatedView } from '../ui/AnimatedView';
import { Button } from '../ui/Button';
import { Colors, Typography, Spacing } from '../../constants';
import { useReviewsStore, Review } from '../../store/reviewsStore';
import { formatPrice } from '../../utils';

interface ProductReviewsProps {
  productId: string;
}

const StarRating: React.FC<{ rating: number; size?: number; interactive?: boolean; onRatingChange?: (rating: number) => void }> = ({
  rating,
  size = 16,
  interactive = false,
  onRatingChange,
}) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => interactive && onRatingChange?.(star)}
          disabled={!interactive}
          activeOpacity={interactive ? 0.7 : 1}
        >
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={size}
            color={Colors.accent.gold}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ReviewItem: React.FC<{ review: Review; onMarkHelpful: (reviewId: string) => void }> = ({
  review,
  onMarkHelpful,
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {review.userName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.reviewerDetails}>
            <View style={styles.nameAndVerified}>
              <Text style={styles.reviewerName}>{review.userName}</Text>
              {review.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={14} color={Colors.accent.sage} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <Text style={styles.reviewDate}>{formatDate(review.date)}</Text>
          </View>
        </View>
        <StarRating rating={review.rating} />
      </View>

      <Text style={styles.reviewTitle}>{review.title}</Text>
      <Text style={styles.reviewComment}>{review.comment}</Text>

      <View style={styles.reviewFooter}>
        <TouchableOpacity
          style={styles.helpfulButton}
          onPress={() => onMarkHelpful(review.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="thumbs-up-outline" size={16} color={Colors.text.secondary} />
          <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { getProductReviews, getAverageRating, getReviewCount, markHelpful } = useReviewsStore();
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  const reviews = getProductReviews(productId);
  const averageRating = getAverageRating(productId);
  const reviewCount = getReviewCount(productId);
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleMarkHelpful = (reviewId: string) => {
    markHelpful(reviewId);
  };

  if (reviews.length === 0) {
    return (
      <View style={styles.container}>
        <AnimatedView animation="slideUp" delay={200}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.noReviews}>
            <Text style={styles.noReviewsText}>No reviews yet</Text>
            <Text style={styles.noReviewsSubtext}>Be the first to review this product</Text>
            <Button
              title="Write a Review"
              onPress={() => {}}
              variant="outline"
              size="medium"
              style={styles.writeReviewButton}
            />
          </View>
        </AnimatedView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AnimatedView animation="slideUp" delay={200}>
        <Text style={styles.sectionTitle}>Reviews ({reviewCount})</Text>
        
        {/* Rating Summary */}
        <View style={styles.ratingSummary}>
          <View style={styles.averageRating}>
            <Text style={styles.averageRatingNumber}>{averageRating}</Text>
            <StarRating rating={Math.floor(averageRating)} size={20} />
            <Text style={styles.reviewCountText}>Based on {reviewCount} reviews</Text>
          </View>
        </View>
      </AnimatedView>

      {/* Reviews List */}
      <View style={styles.reviewsList}>
        {displayedReviews.map((review, index) => (
          <AnimatedView key={review.id} animation="slideUp" delay={400 + index * 100}>
            <ReviewItem review={review} onMarkHelpful={handleMarkHelpful} />
          </AnimatedView>
        ))}
      </View>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <AnimatedView animation="slideUp" delay={600}>
          <TouchableOpacity
            style={styles.showMoreButton}
            onPress={() => setShowAllReviews(!showAllReviews)}
            activeOpacity={0.7}
          >
            <Text style={styles.showMoreText}>
              {showAllReviews ? 'Show Less' : `Show All ${reviewCount} Reviews`}
            </Text>
            <Ionicons
              name={showAllReviews ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={Colors.text.primary}
            />
          </TouchableOpacity>
        </AnimatedView>
      )}

      {/* Write Review Button */}
      <AnimatedView animation="slideUp" delay={800}>
        <Button
          title="Write a Review"
          onPress={() => {}}
          variant="outline"
          size="medium"
          style={styles.writeReviewButton}
        />
      </AnimatedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.styles.h4,
    color: Colors.text.primary,
    marginBottom: Spacing['3xl'],
  },
  ratingSummary: {
    backgroundColor: Colors.background.secondary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xl,
    marginBottom: Spacing['3xl'],
  },
  averageRating: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  averageRatingNumber: {
    ...Typography.styles.h2,
    color: Colors.text.primary,
    fontWeight: Typography.weights.bold,
  },
  starContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewCountText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
  },
  reviewsList: {
    gap: Spacing['3xl'],
    marginBottom: Spacing['3xl'],
  },
  reviewItem: {
    backgroundColor: Colors.background.primary,
    borderRadius: Spacing.radius.lg,
    padding: Spacing.xl,
    elevation: 1,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  reviewerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
  },
  reviewerDetails: {
    flex: 1,
  },
  nameAndVerified: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  reviewerName: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  verifiedText: {
    ...Typography.styles.caption,
    color: Colors.accent.sage,
    fontSize: 10,
  },
  reviewDate: {
    ...Typography.styles.bodySmall,
    color: Colors.text.tertiary,
  },
  reviewTitle: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.semibold,
    marginBottom: Spacing.sm,
  },
  reviewComment: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    lineHeight: Typography.lineHeights.relaxed * Typography.sizes.base,
    marginBottom: Spacing.lg,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  helpfulText: {
    ...Typography.styles.bodySmall,
    color: Colors.text.secondary,
  },
  showMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  showMoreText: {
    ...Typography.styles.body,
    color: Colors.text.primary,
    fontWeight: Typography.weights.medium,
  },
  writeReviewButton: {
    alignSelf: 'center',
    minWidth: 160,
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
  },
  noReviewsText: {
    ...Typography.styles.h6,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  noReviewsSubtext: {
    ...Typography.styles.body,
    color: Colors.text.secondary,
    marginBottom: Spacing['3xl'],
    textAlign: 'center',
  },
});
