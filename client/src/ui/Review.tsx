import { Card, Text, Group, Avatar, Rating, Title } from '@mantine/core';
import { useEffect, useState } from 'react';

interface ReviewProps {
	userId: number;
	rating: number;
	reviewText: string;
}

const SERVER_IP = 'http://localhost:3001/api';

export default function Review({ userId, rating, reviewText }: ReviewProps) {
	const [username, setUsername] = useState('');
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
	}, []);

	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder mb="sm">
			<Group>
				<Avatar color="blue" radius="xl">
					{'A'}
				</Avatar>
				<Title>{username}</Title>
			</Group>

			<Rating value={rating} readOnly mt="md" />

			<Text mt="md">{reviewText}</Text>
		</Card>
	);
}
