'use client';
import { useEffect, useState } from 'react';

import {
	IconChevronRight,
	IconHeart,
	IconLogout,
	IconMessage,
	IconPlayerPause,
	IconSettings,
	IconStar,
	IconSwitchHorizontal,
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
import classes from '../css/UserMenu.module.css';

interface UserMenuProps {
	token: string;
}

const SERVER_IP = 'http://localhost:3001/api';

export function UserMenu({ token }: UserMenuProps) {
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
					<Menu.Item
						leftSection={
							<IconHeart size={16} stroke={1.5} color={theme.colors.red[6]} />
						}>
						Liked posts
					</Menu.Item>
					<Menu.Item
						leftSection={
							<IconStar size={16} stroke={1.5} color={theme.colors.yellow[6]} />
						}>
						Saved posts
					</Menu.Item>
					<Menu.Item
						leftSection={
							<IconMessage size={16} stroke={1.5} color={theme.colors.blue[6]} />
						}>
						Your comments
					</Menu.Item>

					<Menu.Label>Settings</Menu.Label>
					<Menu.Item leftSection={<IconSettings size={16} stroke={1.5} />}>
						Account settings
					</Menu.Item>
					<Menu.Item leftSection={<IconSwitchHorizontal size={16} stroke={1.5} />}>
						Change account
					</Menu.Item>
					<Menu.Item leftSection={<IconLogout size={16} stroke={1.5} />}>
						Logout
					</Menu.Item>

					<Menu.Divider />

					<Menu.Label>Danger zone</Menu.Label>
					<Menu.Item leftSection={<IconPlayerPause size={16} stroke={1.5} />}>
						Pause subscription
					</Menu.Item>
					<Menu.Item color="red" leftSection={<IconTrash size={16} stroke={1.5} />}>
						Delete account
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
