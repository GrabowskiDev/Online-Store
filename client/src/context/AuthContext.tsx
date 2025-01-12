'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { SERVER_IP } from '../config/config';

interface AuthContextProps {
	user: { username: string; email: string } | null;
	token: string | null;
	login: (email: string, password: string, remember: boolean) => Promise<void>;
	logout: () => void;
	loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<{ username: string; email: string } | null>(null);
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const sessionToken = sessionStorage.getItem('token');
		const sessionUser = sessionStorage.getItem('user');
		if (sessionToken && sessionUser) {
			setToken(sessionToken);
			setUser(JSON.parse(sessionUser));
			setLoading(false);
		} else {
			const jwtToken = Cookies.get('jwt');
			if (jwtToken) {
				verifyUser(jwtToken);
			} else {
				setLoading(false);
			}
		}
	}, []);

	const verifyUser = async (jwtToken: string) => {
		try {
			const response = await fetch(`${SERVER_IP}/verify`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwtToken}`,
				},
			});
			if (response.ok) {
				const data = await response.json();
				setUser(data.user);
				setToken(jwtToken);
				sessionStorage.setItem('token', jwtToken);
				sessionStorage.setItem('user', JSON.stringify(data.user));
			} else {
				Cookies.remove('jwt');
			}
		} catch (error) {
			console.error('Error verifying user:', error);
			setUser(null);
			setToken(null);
			sessionStorage.removeItem('token');
			sessionStorage.removeItem('user');
			Cookies.remove('jwt');
		} finally {
			setLoading(false);
		}
	};

	const login = async (email: string, password: string, remember: boolean) => {
		try {
			const response = await fetch(`${SERVER_IP}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				throw new Error('Invalid credentials');
			}

			const data = await response.json();
			const { token, user } = data;

			setUser(user);
			setToken(token);

			if (remember) {
				Cookies.set('jwt', token, { expires: 7 });
			} else {
				Cookies.set('jwt', token);
			}

			sessionStorage.setItem('token', token);
			sessionStorage.setItem('user', JSON.stringify(user));
		} catch (error) {
			console.error('Error logging in:', error);
			throw error;
		}
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user');
		Cookies.remove('jwt');
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
