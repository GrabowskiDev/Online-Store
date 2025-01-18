import { Card, Text, Group, Avatar, Rating, Title, Button } from '@mantine/core';
import { IconPencil, IconTrash } from '@tabler/icons-react';
import { SERVER_IP } from '@/config/config';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ReviewModal from '../AddReview/ReviewModal';
import { notifications } from '@mantine/notifications';

interface ReviewProps {
	userId: number;
	rating: number;
	reviewText: string;
	onDelete?: () => void;
	onReviewUpdated: () => void;
	showOptions?: boolean;
	reviewId: number;
}

export default function Review({
	userId,
	reviewId,
	rating,
	reviewText,
	onDelete,
	onReviewUpdated,
	showOptions,
}: ReviewProps) {
	const [username, setUsername] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { token } = useAuth();

	async function getUserInfo(id: number) {
		try {
			const response = await fetch(`${SERVER_IP}/user/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (!response.ok) {
				console.error('Error fetching user:', response);
				return;
			}
			return await response.json();
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	}

	useEffect(() => {
		getUserInfo(userId).then((userInfo) => {
			if (userInfo) {
				setUsername(userInfo.username);
			}
		});
	}, [userId]);

	const handleUpdateReview = async (newRating: number, newReviewText: string) => {
		try {
			const response = await fetch(`${SERVER_IP}/reviews/${reviewId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ rating: newRating, text: newReviewText }),
			});
			if (!response.ok) {
				notifications.show({
					title: 'An error occured',
					message:
						'Something went wrong while updating the review, please try again later!',
					color: 'red',
				});
				return;
			}
			notifications.show({
				title: 'Review updated',
				message: 'Your review has been updated',
				color: 'green',
			});
			onReviewUpdated();
		} catch {
			notifications.show({
				title: 'Error',
				message: 'An error occurred while updating the review on the client side',
				color: 'red',
			});
		}
	};

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mb="sm">
			<Group justify="space-between">
				<Group>
					<Avatar color="blue" radius="xl">
						{'A'}
					</Avatar>
					<Title>{username}</Title>
				</Group>
				{showOptions && (
					<Group>
						<Button variant="subtle" h={48} w={64} onClick={() => setIsModalOpen(true)}>
							<IconPencil color="black" size={24} />
						</Button>
						<Button variant="subtle" h={48} w={64} onClick={onDelete}>
							<IconTrash color="black" size={24} />
						</Button>
					</Group>
				)}
			</Group>

			<Rating value={rating} fractions={2} readOnly mt="md" />
			<Text mt="md">{reviewText}</Text>

			<ReviewModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleUpdateReview}
				initialRating={rating}
				initialReviewText={reviewText}
			/>
		</Card>
	);
}
