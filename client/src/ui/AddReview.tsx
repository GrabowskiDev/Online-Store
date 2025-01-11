'use client';
import { Paper, Rating, Title, Textarea, Button, Group, Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import Cookies from 'js-cookie';

const SERVER_IP = 'http://localhost:3001/api';

export default function AddReview({ productId }: { productId: number }) {
	const [opened, { open, close }] = useDisclosure(false);
	const [reviewText, setReviewText] = useState('');

	async function submitReview() {
		const jwtToken = Cookies.get('jwt');
		if (!jwtToken) {
			notifications.show({
				title: 'You need to be logged in to add a review',
				message: 'Please log in or register to leave a review',
				color: 'red',
			});
			return;
		}

		try {
			const response = await fetch(`${SERVER_IP}/user`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			});

			if (!response.ok) {
				notifications.show({
					title: 'Error',
					message: 'An error with the user has occured',
					color: 'red',
				});
				return;
			} else {
				const user = await response.json();
				const userId = user.id;
				const response2 = await fetch(`${SERVER_IP}/reviews`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${jwtToken}`,
					},
					body: JSON.stringify({ userId, productId: productId, text: reviewText }),
				});

				if (!response2.ok) {
					notifications.show({
						title: 'Error',
						message: 'An error occurred while adding a review',
						color: 'red',
					});
				} else {
					notifications.show({
						title: 'Success',
						message: 'Review added successfully',
						color: 'green',
					});
					close();
				}
			}
		} catch {
			notifications.show({
				title: 'Error',
				message: 'An error occurred and i have no idea what happened',
				color: 'red',
			});
		}
	}

	return (
		<>
			<Modal opened={opened} onClose={close} title="Review" centered>
				<Rating defaultValue={0} fractions={2} size="lg" mb="lg" />
				<Textarea
					placeholder="Your review"
					label="What do you think about this product?"
					value={reviewText}
					onChange={(e) => {
						setReviewText(e.target.value);
					}}
					mb="lg"
				/>
				<Button color="blue" onClick={submitReview} fullWidth>
					Submit
				</Button>
			</Modal>

			<Paper shadow="lg" withBorder p="sm">
				<Group justify="space-between">
					<Title>You seem to have bought this product</Title>
					<Button variant="default" onClick={open} w={200}>
						Add a review
					</Button>
				</Group>
			</Paper>
		</>
	);
}
