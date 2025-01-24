import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Header from '../components/Header/Header';
import { FooterSimple } from '../components/Layout/FooterSimple';
import { AuthProvider } from '@/context/AuthContext';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Online Store',
	description: 'Online store with Next.js and Mantine',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" {...mantineHtmlProps}>
			<head>
				<ColorSchemeScript />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<div className="mainApp">
					<AuthProvider>
						<MantineProvider>
							<Header />
							<Notifications />
							{children}
							<FooterSimple />
						</MantineProvider>
					</AuthProvider>
				</div>
			</body>
		</html>
	);
}
