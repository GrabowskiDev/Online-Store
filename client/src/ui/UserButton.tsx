'use client';

import { useState, useEffect } from 'react';
import { IconChevronRight } from '@tabler/icons-react';
import { Avatar, Group, Text, UnstyledButton } from '@mantine/core';
import classes from '../css/UserButton.module.css';

interface UserButtonProps {
	token: string;
}

const SERVER_IP = 'http://localhost:3001/api';

export function UserButton({ token }: UserButtonProps) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	async function getUserData() {
		try {
			const response = await fetch(`${SERVER_IP}/user`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				const data = await response.json();
				setUsername(data.username);
				setEmail(data.email);
			} else {
				console.error('Failed to fetch user data' + token);
			}
		} catch (error) {
			console.error('Failed to fetch user data:', error);
		}
	}

	useEffect(() => {
		if (token) {
			getUserData();
		}
	}, [token]);

	return (
		<UnstyledButton className={classes.user}>
			<Group>
				<Avatar
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
					radius="xl"
				/>

				<div style={{ flex: 1 }}>
					<Text size="sm" fw={500}>
						{username || 'Loading...'}
					</Text>

					<Text c="dimmed" size="xs">
						{email || 'Loading...'}
					</Text>
				</div>

				<IconChevronRight size={14} stroke={1.5} />
			</Group>
		</UnstyledButton>
	);
}
