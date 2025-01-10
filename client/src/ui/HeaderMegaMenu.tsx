'use client';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
	Anchor,
	Box,
	Burger,
	Button,
	Divider,
	Drawer,
	Group,
	ScrollArea,
	Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from '../css/HeaderMegaMenu.module.css';
import { UserMenu } from './UserMenu';

export function HeaderMegaMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);

	const [token, setToken] = useState('');
	const [userLogged, setUserLogged] = useState(false);

	useEffect(() => {
		const jwtToken = Cookies.get('jwt');
		if (jwtToken) {
			setToken(jwtToken);
			setUserLogged(true);
		} else {
			setUserLogged(false);
			console.log('User not logged in');
		}
	}, []);

	const handleLogout = () => {
		setToken('');
		setUserLogged(false);
	};

	return (
		<Box pb={120}>
			<header className={classes.header}>
				<Group justify="space-evenly" h="100%">
					<Anchor href="/">
						<Image src="/next.svg" alt="Logo" h={20} w="auto" />
					</Anchor>
					<Group h="100%" gap={0} visibleFrom="sm">
						<a href="#" className={classes.link}>
							Home
						</a>
						<a href="#" className={classes.link}>
							Learn
						</a>
						<a href="#" className={classes.link}>
							Academy
						</a>
					</Group>

					<Group visibleFrom="sm">
						{userLogged && <UserMenu token={token} onLogout={handleLogout} />}
						{!userLogged && (
							<>
								<Anchor href="/login">
									<Button variant="default">Log in</Button>
								</Anchor>
								<Anchor href="/register">
									<Button>Sign up</Button>
								</Anchor>
							</>
						)}
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}>
				<ScrollArea h="calc(100vh - 80px" mx="-md">
					<Divider my="sm" />

					<a href="#" className={classes.link}>
						Home
					</a>
					<a href="#" className={classes.link}>
						Learn
					</a>
					<a href="#" className={classes.link}>
						Academy
					</a>

					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						{userLogged && <UserMenu token={token} onLogout={handleLogout} />}
						{!userLogged && (
							<>
								<Anchor href="/login">
									<Button variant="default">Log in</Button>
								</Anchor>
								<Anchor href="/register">
									<Button>Sign up</Button>
								</Anchor>
							</>
						)}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
