'use client';
import { Container, Paper, Group, Button, Title } from '@mantine/core';
import classes from './page.module.css';
import ProductList from '@/components/Product/ProductList';
import { useEffect, useState } from 'react';
import { IconCashRegister } from '@tabler/icons-react';
import { useAuth } from '@/context/AuthContext';
import { SERVER_IP } from '@/config/config';
import { notifications } from '@mantine/notifications';
import { fetchProduct } from '@/utils/api';
import { useRouter } from 'next/navigation';

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

export default function CartPage() {
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
			const fetchCart = async () => {
				try {
					const response = await fetch(`${SERVER_IP}/cart`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (!response.ok) {
						throw new Error('Failed to fetch cart');
					}

					const data = await response.json();

					if (!Array.isArray(data)) {
						throw new Error('Cart data is not an array');
					}

					setCartFetched(true);

					// Fetch product details based on cart items
					const productPromises = data.map(async (item) => {
						const productData = await fetchProduct(item.productId, true);
						return { ...productData, quantity: item.quantity, cartId: item.id };
					});

					const productsData = await Promise.all(productPromises);
					setProductList(productsData);
				} catch (error) {
					console.log('Error fetching cart:', error);
					notifications.show({
						title: 'Error fetching cart',
						message: 'Error fetching cart',
						color: 'red',
					});
				}
			};

			fetchCart();
		}
	}, [loading, token, cartFetched]);

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
					<ProductList list={productList} />
				</Paper>
				<Group justify="space-between" align="center">
					<Title>Total price: $ {totalPrice.toFixed(2)} </Title>
					<Button
						justify="center"
						h={44}
						rightSection={<IconCashRegister size={24} style={{ color: 'white' }} />}
						leftSection={<span />}
						variant="filled"
						onClick={() => {
							notifications.show({
								title: 'This feature is not implemented yet',
								color: 'red',
								message: undefined,
							});
						}}>
						BUY NOW
					</Button>
				</Group>
			</Container>
		</div>
	);
}
