'use client';
import {
	IconChevronRight,
	IconBasketCheck,
	IconLogout,
	IconSettings,
	IconStar,
	IconShoppingCart,
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
import { useAuth } from '../../context/AuthContext';

interface UserMenuProps {
	onLogout: () => void;
}

export function UserMenu({ onLogout }: UserMenuProps) {
	const theme = useMantineTheme();
	const { user } = useAuth();

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
							<Avatar color="blue" radius="xl">
								{user?.username.charAt(0).toUpperCase()}
							</Avatar>

							<div style={{ flex: 1 }}>
								<Text size="sm" fw={500}>
									{user?.username || 'Loading...'}
								</Text>

								<Text c="dimmed" size="xs">
									{user?.email || 'Loading...'}
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
							<IconShoppingCart size={16} stroke={1.5} color={theme.colors.blue[6]} />
						}
						onClick={() => (window.location.href = '/cart')}>
						Cart
					</Menu.Item>
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
						onClick={onLogout}>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Group>
	);
}
