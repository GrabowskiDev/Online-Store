import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import classes from '@/css/AuthenticationTitle.module.css';

interface AuthenticationTitleProps {
	onForgotPassword: () => void;
}

const SERVER_IP = 'http://localhost:3001/api';

export function AuthenticationTitle({ onForgotPassword }: AuthenticationTitleProps) {
	const router = useRouter();
	const [error, setError] = useState('');

	const form = useForm({
		mode: 'uncontrolled',
		initialValues: { email: '', password: '', remember: false },

		// functions will be used to validate values at corresponding key
		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) =>
				value.length < 4 ? 'Password must have at least 4 letters' : null,
		},
	});

	async function handleLogin(values: {
		email: string;
		password: string;
		remember: boolean;
	}) {
		const { email, password, remember } = values;

		try {
			const response = await fetch(`${SERVER_IP}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.status == 404) {
				setError('User not found');
				return;
			} else if (response.status == 401) {
				setError('Invalid password');
				return;
			} else if (!response.ok) {
				setError('Server error, try again later!');
				return;
			} else {
				setError('');
			}

			const data = await response.json();
			const { token } = data;

			if (remember) {
				Cookies.set('jwt', token, { expires: 7 }); // 7 days
			} else {
				Cookies.set('jwt', token); // Session cookie
			}

			notifications.show({
				id: 'logged-in',
				position: 'top-center',
				withCloseButton: false,
				autoClose: 2000,
				title: 'Logged in successfully!',
				message: 'Redirecting, please wait...',
				loading: true,
				withBorder: true,
			});
			await new Promise((resolve) => setTimeout(resolve, 1000));
			router.push('/');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			setError('Something went wrong, try again later');
		}
	}

	return (
		<Container>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor size="sm" href="/register">
					Create account
				</Anchor>
			</Text>

			<form onSubmit={form.onSubmit(handleLogin)}>
				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						label="Email"
						placeholder="student@agh.pl"
						key={form.key('email')}
						{...form.getInputProps('email')}
					/>
					<PasswordInput
						mt="md"
						label="Password"
						placeholder="Your password"
						key={form.key('password')}
						{...form.getInputProps('password')}
					/>
					<Group justify="space-between" mt="lg">
						<Checkbox
							label="Remember me"
							key={form.key('remember')}
							{...form.getInputProps('remember')}
						/>
						<Anchor component="button" size="sm" onClick={onForgotPassword}>
							Forgot password?
						</Anchor>
					</Group>
					{error && (
						<Text color="red" mt={10}>
							{error}
						</Text>
					)}
					<Button type="submit" fullWidth mt={10}>
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
