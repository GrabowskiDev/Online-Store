import { Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import AddReview from '../AddReview/AddReview';
import Review from './Review';
import { SERVER_IP } from '@/config/config';
import { Review as ReviewType } from '@/config/types';

export default function ProductReviews({ productId }: { productId: number }) {
	const [reviews, setReviews] = useState<ReviewType[]>([]);

	useEffect(() => {
		try {
			fetch(`${SERVER_IP}/reviews/product/${productId}`)
				.then((res) => res.json())
				.then((data) => {
					setReviews(data);
				});
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	}, []);

	return (
		<Paper radius="lg" withBorder p={'3rem'}>
			<AddReview productId={productId} />
			{reviews.map((review) => (
				<Review
					key={review.id}
					userId={review.userId}
					rating={review.rating}
					reviewText={review.text}
				/>
			))}
		</Paper>
	);
}
