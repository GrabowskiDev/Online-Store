'use client';

import { useState } from 'react';
import { AuthenticationTitle } from '@/ui/AuthenticationTitle';
import { ForgotPassword } from '@/ui/ForgotPassword';

export function LoginClient() {
	const [showForgotPassword, setShowForgotPassword] = useState(false);

	return (
		<>
			{showForgotPassword ? (
				<ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
			) : (
				<AuthenticationTitle onForgotPassword={() => setShowForgotPassword(true)} />
			)}
		</>
	);
}
