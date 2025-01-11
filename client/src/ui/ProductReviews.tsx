import { Paper } from '@mantine/core';
import { useEffect, useState } from 'react';
import AddReview from './AddReview';

const SERVER_IP = 'http://localhost:3001/api';

interface Review {
	id: number;
	userId: number;
	productId: number;
	text: string;
	createdAt: string;
	updatedAt: string;
}

export default function ProductReviews({ productId }: { productId: number }) {
	const [reviews, setReviews] = useState<Review[]>([]);

	useEffect(() => {
		try {
			fetch(`${SERVER_IP}/reviews/product/${productId}`)
				.then((res) => res.json())
				.then((data) => {
					setReviews(data);
					console.log(data.image);
				});
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	}, []);

	return (
		<Paper radius="lg" withBorder p={'3rem'}>
			<AddReview productId={productId} />
			{reviews.map((review) => (
				<div key={review.id}>
					<p>{review.text}</p>
					<p>{review.createdAt}</p>
				</div>
			))}
		</Paper>
	);
}
