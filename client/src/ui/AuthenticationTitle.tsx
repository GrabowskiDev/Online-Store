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
import { useState } from 'react';
import classes from '../css/AuthenticationTitle.module.css';

interface AuthenticationTitleProps {
	onForgotPassword: () => void;
}

const SERVER_IP = 'http://localhost:3001/api';

export function AuthenticationTitle({ onForgotPassword }: AuthenticationTitleProps) {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(false);
	const [error, setError] = useState('');

	async function handleLogin() {
		try {
			const response = await fetch(`${SERVER_IP}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ login, password }),
			});

			if (!response.ok) {
				setError('Invalid login or password');
				return;
			}

			const data = await response.json();
			const { token } = data.token;

			localStorage.setItem('jwt', token);

			console.log('Logged in');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (e) {
			setError('Something went wrong');
		}
	}

	return (
		<Container size={420} my={40}>
			<Title ta="center" className={classes.title}>
				Welcome back!
			</Title>
			<Text c="dimmed" size="sm" ta="center" mt={5}>
				Do not have an account yet?{' '}
				<Anchor size="sm" component="button">
					Create account
				</Anchor>
			</Text>

			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<TextInput
					label="Email"
					placeholder="you@mantine.dev"
					required
					value={login}
					onChange={(event) => setLogin(event.currentTarget.value)}
				/>
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
					value={password}
					onChange={(event) => setPassword(event.currentTarget.value)}
				/>
				<Group justify="space-between" mt="lg">
					<Checkbox
						label="Remember me"
						checked={remember}
						onChange={(event) => setRemember(event.currentTarget.checked)}
					/>
					<Anchor component="button" size="sm" onClick={onForgotPassword}>
						Forgot password?
					</Anchor>
				</Group>
				{error && <Text color="red">{error}</Text>}
				<Button fullWidth mt="xl" onClick={handleLogin}>
					Sign in
				</Button>
			</Paper>
		</Container>
	);
}
