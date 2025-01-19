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
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import classes from '@/css/LoginForm.module.css';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const SERVER_IP = 'http://localhost:3001/api';

export function RegisterClient() {
	const router = useRouter();
	const { token, loading } = useAuth();

	useEffect(() => {
		if (!loading && token) {
			notifications.show({
				title: 'You are already logged in',
				message: 'Redirecting to main page',
				color: 'blue',
			});
			router.push('/');
		}
	}, [loading, token, router]);

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			email: '',
			username: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},

		// functions will be used to validate values at corresponding key
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			username: (value) => (value.length < 1 ? 'Username cant be empty' : null),
			password: (value) =>
				value.length < 4 ? 'Password must have at least 4 letters' : null,
			confirmPassword: (value, values) =>
				value !== values.password ? 'Passwords did not match' : null,
		},
	});

	async function handleRegister(values: {
		email: string;
		username: string;
		firstName: string;
		lastName: string;
		password: string;
	}) {
		const { email, username, firstName, lastName, password } = values;

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
				notifications.show({
					id: 'register-failed',
					withCloseButton: true,
					autoClose: 2000,
					title: 'Oh no, something went wrong!',
					message: 'Please try again later',
					loading: false,
					withBorder: true,
					color: 'red',
				});

				return;
			}

			notifications.show({
				id: 'registered',
				withCloseButton: true,
				autoClose: 2000,
				title: 'Registered successfully',
				message: 'You can now log in!',
				loading: false,
				withBorder: true,
			});

			router.push('/login');
		} catch {
			notifications.show({
				id: 'register-failed',
				withCloseButton: true,
				autoClose: 2000,
				title: 'Oh no, something went wrong!',
				message: 'Please try again later',
				loading: false,
				withBorder: true,
				color: 'red',
			});
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

			<form onSubmit={form.onSubmit(handleRegister)}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<SimpleGrid cols={2} spacing="lg">
						<TextInput
							label="Email"
							placeholder="you@mantine.dev"
							key={form.key('email')}
							{...form.getInputProps('email')}
						/>
						<TextInput
							label="Username"
							placeholder="banana17"
							key={form.key('username')}
							{...form.getInputProps('username')}
						/>
						<TextInput
							label="First name"
							placeholder="John"
							key={form.key('firstName')}
							{...form.getInputProps('firstName')}
						/>
						<TextInput
							label="Last name"
							placeholder="Doe"
							key={form.key('lastName')}
							{...form.getInputProps('lastName')}
						/>
						<PasswordInput
							label="Password"
							placeholder="Your password"
							key={form.key('password')}
							{...form.getInputProps('password')}
						/>
						<PasswordInput
							label="Confirm password"
							placeholder="Your password"
							key={form.key('confirmPassword')}
							{...form.getInputProps('confirmPassword')}
						/>
					</SimpleGrid>
					<Button fullWidth mt="xl" type="submit">
						Register
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
