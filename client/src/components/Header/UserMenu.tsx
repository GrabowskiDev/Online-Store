'use client';
import { useEffect, useState } from 'react';

import {
	IconChevronRight,
	IconBasketCheck,
	IconLogout,
	IconSettings,
	IconStar,
	IconTrash,
} from '@tabler/icons-react';
import {
	Avatar,
	Group,
	Menu,
	Text,
	UnstyledButton,
	useMantineTheme,
} from '@mantine/core';
import classes from '@/css/UserMenu.module.css';
import Cookies from 'js-cookie';

interface UserMenuProps {
	token: string;
	onLogout: () => void;
}

const SERVER_IP = 'http://localhost:3001/api';

export function UserMenu({ token, onLogout }: UserMenuProps) {
	const theme = useMantineTheme();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
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
		if (token) {
			getUserData();
		}
	}, [token]);

	function handleLogout() {
		Cookies.remove('jwt');
		onLogout();
	}

	return (
		<Group justify="center">
			<Menu
				withArrow
				width={300}
				position="bottom"
				transitionProps={{ transition: 'pop' }}
				withinPortal>
				<Menu.Target>
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
				</Menu.Target>
				<Menu.Dropdown>
					<Menu.Label>Your stuff</Menu.Label>
					<Menu.Item
						leftSection={
							<IconBasketCheck size={16} stroke={1.5} color={theme.colors.blue[6]} />
						}>
						Orders
					</Menu.Item>
					<Menu.Item
						leftSection={
							<IconStar size={16} stroke={1.5} color={theme.colors.yellow[6]} />
						}>
						Reviews
					</Menu.Item>

					<Menu.Label>Settings</Menu.Label>
					<Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
						Account settings
					</Menu.Item>
					<Menu.Item
						leftSection={<IconLogout size={16} stroke={1.5} />}
						onClick={handleLogout}>
						Logout
					</Menu.Item>

					<Menu.Divider />

					<Menu.Label>Danger zone</Menu.Label>
					<Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
						Delete account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
