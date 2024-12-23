'use client';

import { useState } from 'react';
import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import { AuthenticationTitle } from '@/ui/AuthenticationTitle';
import { ForgotPassword } from '@/ui/ForgotPassword';
import classes from './page.module.css';

export default function LoginPage() {
	const [showForgotPassword, setShowForgotPassword] = useState(false);

	return (
		<div className={classes.main}>
			<HeaderMegaMenu />
			{showForgotPassword ? (
				<ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
			) : (
				<AuthenticationTitle onForgotPassword={() => setShowForgotPassword(true)} />
			)}
			<FooterSimple />
		</div>
	);
}
