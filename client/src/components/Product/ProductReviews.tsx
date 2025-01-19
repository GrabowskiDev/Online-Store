import { Paper } from '@mantine/core';
import AddReview from '../AddReview/AddReview';
import Review from './Review';
import { Review as ReviewType } from '@/config/types';
import { useAuth } from '@/context/AuthContext';

interface ProductReviewsProps {
	productId: number;
	reviews: ReviewType[];
	deleteReview: (reviewId: number, token: string | null) => Promise<void>;
	fetchReviews: () => Promise<void>;
}

export default function ProductReviews({
	productId,
	reviews,
	deleteReview,
	fetchReviews,
}: ProductReviewsProps) {
	const { user, token } = useAuth();
	return (
		<Paper radius="lg" withBorder p={'3rem'}>
			<AddReview productId={productId} onReviewAdded={fetchReviews} />
			{reviews.map((review) => (
				<Review
					key={review.id}
					reviewId={review.id}
					userId={review.userId}
					rating={review.rating}
					reviewText={review.text}
					onDelete={() => deleteReview(review.id, token).then(fetchReviews)}
					showOptions={review.userId === user?.id}
					onReviewUpdated={fetchReviews}
				/>
			))}
		</Paper>
	);
}
