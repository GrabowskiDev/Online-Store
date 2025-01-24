'use client';
import { Container, Paper, Group, Title } from '@mantine/core';
import classes from './page.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { SERVER_IP } from '@/config/config';
import { notifications } from '@mantine/notifications';
import { fetchProduct } from '@/utils/api';
import { useRouter, useParams } from 'next/navigation';
import OrderProductList from '@/components/Orders/OrderProductList';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
	quantity: number;
	cartId: number;
}

export default function OrderDetailPage() {
	const params = useParams<{ id: string }>();

	const [productList, setProductList] = useState<Product[]>([]);

	const [totalPrice, setTotalPrice] = useState(0);
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
			const fetchOrderDetails = async () => {
				try {
					const response = await fetch(`${SERVER_IP}/orders/${params.id}`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to fetch products');
					}

					const data = await response.json();

					if (!Array.isArray(data)) {
						console.log(data);
						throw new Error('Cart data is not an array');
					}

					setCartFetched(true);

					// Fetch product details based on cart items
					const productPromises = data.map(async (item) => {
						const productData = await fetchProduct(item.productId, true);
						return { ...productData, quantity: item.quantity, cartId: 0 };
					});

					const productsData = await Promise.all(productPromises);
					setProductList(productsData);
				} catch (error) {
					console.log('Error fetching cart:', error);
					notifications.show({
						title: 'Order not found',
						message: 'No order with this id found for you',
						color: 'red',
					});
					router.push('/orders');
				}
			};

			fetchOrderDetails();
		}
	}, [loading, token, cartFetched, productList, router, params.id]);

	useEffect(() => {
		let total = 0;
		productList.map((product) => {
			total += product.price * product.quantity;
		});
		setTotalPrice(total);
	}, [productList]);

	return (
		<div className={classes.main}>
			<Container size="lg">
				<Paper withBorder w={'100%'} mih={'50vh'} mb="lg">
					<OrderProductList list={productList} />
				</Paper>
				<Group justify="space-between" align="center">
					<Title>Total price: $ {totalPrice.toFixed(2)} </Title>
				</Group>
			</Container>
		</div>
	);
}
