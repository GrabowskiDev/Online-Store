'use client';
import { Title, Button, Group, Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import ReviewModal from './ReviewModal';
import { SERVER_IP } from '@/config/config';
import { useAuth } from '@/context/AuthContext';

interface AddReviewProps {
	productId: number;
	onReviewAdded: () => void;
	userHasReviewed: boolean;
}

export default function AddReview({
	productId,
	onReviewAdded,
	userHasReviewed,
}: AddReviewProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { token } = useAuth();

	const handleAddReview = async (rating: number, reviewText: string) => {
		try {
			const response = await fetch(`${SERVER_IP}/reviews`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ productId, rating, text: reviewText }),
			});
			if (!response.ok) {
				notifications.show({
					title: 'Error',
					message: 'An error occurred while adding a review',
					color: 'red',
				});
				return;
			}
			notifications.show({
				title: 'Added review',
				message: 'Your review has been added',
				color: 'green',
			});
			onReviewAdded();
		} catch {
			notifications.show({
				title: 'Error',
				message: 'An error occurred while adding a review',
				color: 'red',
			});
		}
	};

	return (
		<>
			<Box mb="xl">
				<Group justify="space-between">
					<Title>All reviews</Title>
					{token && !userHasReviewed ? (
						<Button variant="default" onClick={() => setIsModalOpen(true)} w={200}>
							Add a review
						</Button>
					) : (
						token &&
						userHasReviewed && (
							<Text color="dimmed">You have already reviewed this product.</Text>
						)
					)}
				</Group>
			</Box>

			<ReviewModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleAddReview}
			/>
		</>
	);
}
