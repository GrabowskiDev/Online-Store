import { Paper } from '@mantine/core';
import AddReview from '../AddReview/AddReview';
import Review from './Review';
import { Review as ReviewType } from '@/config/types';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';

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
	const [userHasReviewed, setUserHasReviewed] = useState(false);

	useEffect(() => {
		setUserHasReviewed(reviews.some((review) => review.userId === user?.id));
	}, [reviews, user]);

	return (
		<Paper radius="lg" withBorder p={'3rem'}>
			<AddReview
				productId={productId}
				onReviewAdded={fetchReviews}
				userHasReviewed={userHasReviewed}
			/>
			{reviews.map((review) => (
				<Review
					key={review.id}
					reviewId={review.id}
					userId={review.userId}
					rating={review.rating}
					reviewText={review.text}
					date={review.createdAt}
					onDelete={() => deleteReview(review.id, token).then(fetchReviews)}
					showOptions={review.userId === user?.id}
					onReviewUpdated={fetchReviews}
				/>
			))}
		</Paper>
	);
}
