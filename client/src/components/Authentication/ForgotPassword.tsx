import { IconArrowLeft } from '@tabler/icons-react';
import {
	Anchor,
	Box,
	Button,
	Center,
	Container,
	Group,
	Paper,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import classes from '@/css/ForgotPassword.module.css';

interface ForgotPasswordProps {
	onBackToLogin: () => void;
}

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
	function handleResetPassword() {
		notifications.show({
			id: 'password-forgot',
			withCloseButton: true,
			title: 'Just make a new account!',
			message: 'AND REMEMBER YOUR PASSWORD THIS TIME!',
			loading: false,
			withBorder: true,
			color: 'red',
		});
	}

	return (
		<Container size={460} my={30}>
			<Title className={classes.title} ta="center">
				Forgot your password?
			</Title>
			<Text c="dimmed" fz="sm" ta="center">
				Enter your email to get a reset link
			</Text>

			<Paper withBorder shadow="md" p={30} radius="md" mt="xl">
				<TextInput label="Your email" placeholder="me@mantine.dev" required />
				<Group justify="space-between" mt="lg" className={classes.controls}>
					<Anchor
						c="dimmed"
						size="sm"
						className={classes.control}
						onClick={onBackToLogin}>
						<Center inline>
							<IconArrowLeft size={12} stroke={1.5} />
							<Box ml={5}>Back to the login page</Box>
						</Center>
					</Anchor>
					<Button className={classes.control} onClick={handleResetPassword}>
						Reset password
					</Button>
				</Group>
			</Paper>
		</Container>
	);
}
