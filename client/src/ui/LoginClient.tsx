'use client';

import { useState, useEffect } from 'react';
import { Container, Transition } from '@mantine/core';
import { AuthenticationTitle } from '@/ui/AuthenticationTitle';
import { ForgotPassword } from '@/ui/ForgotPassword';

export function LoginClient() {
	const [showForgotPassword, setShowForgotPassword] = useState(false);
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(true);
	}, []);

	return (
		<Transition
			mounted={animate}
			transition="slide-down"
			duration={300}
			timingFunction="ease-out">
			{(styles) => (
				<Container style={styles}>
					{showForgotPassword ? (
						<ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
					) : (
						<AuthenticationTitle onForgotPassword={() => setShowForgotPassword(true)} />
					)}
				</Container>
			)}
		</Transition>
	);
}
