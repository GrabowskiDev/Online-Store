'use client';
import {
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	SimpleGrid,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import classes from '@/css/LoginForm.module.css';

const SERVER_IP = 'http://localhost:3001/api';

export function RegisterClient() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();

	async function handleRegister() {
		if (password !== passwordConfirm) {
			setError('Passwords do not match');
			return;
		}

		try {
			const response = await fetch(`${SERVER_IP}/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					username,
					password,
					firstName,
					lastName,
				}),
			});

			if (!response.ok) {
				setError('Invalid data');
				return;
			}

			notifications.show({
				id: 'logged-in',
				position: 'top-center',
				withCloseButton: true,
				autoClose: 2000,
				title: 'Registered successfully',
				message: 'You can now log in!',
				loading: false,
				withBorder: true,
			});

			router.push('/login');

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			setError('Something went wrong');
		}
	}

	return (
		<Container>
			<Title ta="center" className={classes.title}>
				Create an account!
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Already have an account?{' '}
				<Anchor
					size="sm"
					component="button"
					onClick={() => (window.location.href = '../login')}>
					Login here
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<SimpleGrid cols={2} spacing="lg">
					<TextInput
						label="Email"
						placeholder="you@mantine.dev"
						required
						value={email}
						onChange={(event) => setEmail(event.currentTarget.value)}
					/>
					<TextInput
						label="Username"
						placeholder="StudentDebil"
						required
						value={username}
						onChange={(event) => setUsername(event.currentTarget.value)}
					/>
					<TextInput
						label="First name"
						placeholder="John"
						value={firstName}
						onChange={(event) => setFirstName(event.currentTarget.value)}
					/>
					<TextInput
						label="Last name"
						placeholder="Doe"
						value={lastName}
						onChange={(event) => setLastName(event.currentTarget.value)}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						value={password}
						onChange={(event) => setPassword(event.currentTarget.value)}
					/>
					<PasswordInput
						label="Confirm password"
						placeholder="Your password"
						required
						value={passwordConfirm}
						onChange={(event) => setPasswordConfirm(event.currentTarget.value)}
					/>
				</SimpleGrid>
				{error && <Text color="red">{error}</Text>}
				<Button fullWidth mt="xl" onClick={handleRegister}>
					Register
				</Button>
			</Paper>
		</Container>
	);
}
