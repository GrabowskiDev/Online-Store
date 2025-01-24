'use client';
import { Center, Container, Paper, Title } from '@mantine/core';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SERVER_IP } from '@/config/config';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import OrdersList from '@/components/Orders/OrdersList';

interface Order {
	id: number;
	userId: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export default function CartPage() {
	const [ordersList, setOrdersList] = useState<Order[]>([]);
	const [cartFetched, setCartFetched] = useState(false);
	const { token, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!token && !loading) {
			notifications.show({
				title: 'You need to be logged in to view your cart',
				message: 'Please log in or register to view your cart',
				color: 'red',
			});
			router.push('/login');
			return;
		}

		if (!loading && token && !cartFetched) {
			const fetchOrders = async () => {
				try {
					const response = await fetch(`${SERVER_IP}/orders`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to fetch cart');
					}

					const data = await response.json();

					if (!Array.isArray(data)) {
						throw new Error('Orders data is not an array');
					}
					setOrdersList(data);
					setCartFetched(true);
				} catch (error) {
					console.log('Error fetching orders:', error);
					notifications.show({
						title: 'Error fetching orders',
						message: 'Error fetching orders',
						color: 'red',
					});
				}
			};

			fetchOrders();
		}
	}, [loading, token, cartFetched, ordersList, router]);

	return (
		<div className={classes.main}>
			<Container size="lg">
				<Paper withBorder w={'100%'} mih={'50vh'} mb="lg">
					{ordersList.length === 0 ? (
						<Center>
							<Title>No orders found</Title>
						</Center>
					) : (
						<OrdersList list={ordersList} />
					)}
				</Paper>
			</Container>
		</div>
	);
}
