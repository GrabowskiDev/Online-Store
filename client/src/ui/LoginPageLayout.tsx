'use client';
import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import { LoginClient } from '@/ui/LoginClient';
import { AppShell } from '@mantine/core';
// import classes from './page.module.css';

export default function LoginPageLayout() {
	return (
		<AppShell
			header={{ height: 60 }}
			footer={{
				height: 60,
			}}
			padding="md">
			<AppShell.Header>
				<HeaderMegaMenu />
			</AppShell.Header>
			<AppShell.Main>
				<LoginClient />
			</AppShell.Main>
			<AppShell.Footer>
				<FooterSimple />
			</AppShell.Footer>
		</AppShell>
	);
}
