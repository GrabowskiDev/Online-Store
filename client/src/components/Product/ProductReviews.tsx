import { Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import AddReview from '../AddReview/AddReview';
import Review from './Review';
import { SERVER_IP } from '@/config/config';
import { Review as ReviewType } from '@/config/types';
import { useAuth } from '@/context/AuthContext';
import { notifications } from '@mantine/notifications';

export default function ProductReviews({ productId }: { productId: number }) {
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const { user, token } = useAuth();

	const fetchReviews = async () => {
		try {
			fetch(`${SERVER_IP}/reviews/product/${productId}`)
				.then((res) => res.json())
				.then((data) => {
					const sortedReviews = data.sort((a: ReviewType, b: ReviewType) => {
						if (a.userId === user?.id) return -1;
						if (b.userId === user?.id) return 1;
						return 0;
					});

					setReviews(sortedReviews);
				});
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [productId, user]);

	const deleteReview = async (reviewId: number) => {
		try {
			const response = await fetch(`${SERVER_IP}/reviews/${reviewId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			if (response.ok) {
				setReviews(reviews.filter((review) => review.id !== reviewId));
				notifications.show({
					title: 'Review deleted',
					message: 'Your review has been deleted',
					color: 'green',
				});
			} else {
				notifications.show({
					title: 'Error',
					message: 'An error has occured',
					color: 'red',
				});
			}
		} catch {
			notifications.show({
				title: 'Error',
				message: 'An error has occured',
				color: 'red',
			});
		}
	};

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
					onDelete={() => deleteReview(review.id)}
					showOptions={review.userId === user?.id}
					onReviewUpdated={fetchReviews}
				/>
			))}
		</Paper>
	);
}
