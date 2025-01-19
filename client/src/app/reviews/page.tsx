'use client';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SERVER_IP } from '@/config/config';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { Review as ReviewType } from '@/config/types';
import Review from '@/components/Product/Review';
import { Paper, Container, Group, Stack, Image, Text, Box } from '@mantine/core';
import { deleteReview } from '@/utils/api';

export default function ReviewsPage() {
	const [reviewsList, setReviewsList] = useState<ReviewType[]>([]);
	const [productImages, setProductImages] = useState<Record<number, string>>({});
	const [productNames, setProductNames] = useState<Record<number, string>>({});
	const { user, loading, token } = useAuth();
	const router = useRouter();

	const fetchReviews = async () => {
		try {
			const response = await fetch(`${SERVER_IP}/reviews/user/${user?.id}`, {});
			if (!response.ok) {
				throw new Error('Failed to fetch reviews');
			}

			const data = await response.json();

			if (!Array.isArray(data)) {
				throw new Error('Reviews data is not an array');
			}

			setReviewsList(data);
			const images: Record<number, string> = {};
			const names: Record<number, string> = {};
			for (const review of data) {
				images[review.productId] = await fetchProductImage(review.productId);
				names[review.productId] = await fetchProductName(review.productId);
			}
			setProductImages(images);
			setProductNames(names);
		} catch (error) {
			console.log('Error fetching cart:', error);
			notifications.show({
				title: 'Error fetching cart',
				message: 'Error fetching cart',
				color: 'red',
			});
		}
	};

	const fetchProductImage = async (productId: number) => {
		try {
			const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

			if (!response.ok) {
				console.error('Error fetching product:', response);
				return;
			}

			const data = await response.json();
			return data.image;
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	const fetchProductName = async (productId: number) => {
		try {
			const response = await fetch(`https://fakestoreapi.com/products/${productId}`);

			if (!response.ok) {
				console.error('Error fetching product:', response);
				return;
			}

			const data = await response.json();
			return data.title;
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	// useEffect(() => {}, [reviewsLists]);

	useEffect(() => {
		if (!user && !loading) {
			notifications.show({
				title: 'You need to be logged in to view your reviews',
				message: 'Please log in or register to view your reviews',
				color: 'red',
			});
			router.push('/login');
			return;
		}

		if (!loading && user) {
			fetchReviews();
		}
	}, [loading, user]);

	return (
		<div className={classes.main}>
			<Container size="xl">
				<Paper p="xl" shadow="xs">
					{reviewsList.map((review: ReviewType) => (
						<Paper shadow="xs" p="md" key={review.id} mb={20}>
							<Group justify="space-between">
								<Stack w="20%">
									<Image
										src={productImages[review.productId]}
										alt={productNames[review.productId]}
										style={{ width: '100%', height: '100%' }}
									/>
									<Text>{productNames[review.productId]}</Text>
								</Stack>
								<Box w="70%">
									<Review
										reviewId={review.id}
										userId={review.userId}
										rating={review.rating}
										reviewText={review.text}
										onDelete={() => deleteReview(review.id, token).then(fetchReviews)}
										showOptions={review.userId === user?.id}
										onReviewUpdated={fetchReviews}
									/>
								</Box>
							</Group>
						</Paper>
					))}
				</Paper>
			</Container>
		</div>
	);
}
