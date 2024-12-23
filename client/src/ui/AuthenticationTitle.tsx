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
import classes from '../css/AuthenticationTitle.module.css';

interface AuthenticationTitleProps {
	onForgotPassword: () => void;
}

export function AuthenticationTitle({ onForgotPassword }: AuthenticationTitleProps) {
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
				<TextInput label="Email" placeholder="you@mantine.dev" required />
				<PasswordInput label="Password" placeholder="Your password" required mt="md" />
				<Group justify="space-between" mt="lg">
					<Checkbox label="Remember me" />
					<Anchor component="button" size="sm" onClick={onForgotPassword}>
						Forgot password?
					</Anchor>
				</Group>
				<Button fullWidth mt="xl">
					Sign in
				</Button>
			</Paper>
		</Container>
	);
}
