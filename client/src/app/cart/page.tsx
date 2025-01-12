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

interface CartProduct {
	id: number;
	quantity: number;
}

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
	quantity: number;
}

export default function CartPage() {
	const [cart, setCart] = useState<CartProduct[]>([]);
	const [productList, setProductList] = useState<Product[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const { token, loading } = useAuth();

	useEffect(() => {
		if (!token && !loading) {
			notifications.show({
				title: 'You need to be logged in to view your cart',
				message: 'Please log in or register to view your cart',
				color: 'red',
			});
			return;
		}

		const fetchCart = async () => {
			try {
				const response = await fetch(`${SERVER_IP}/cart`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
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

				setCart(data);
			} catch {
				notifications.show({
					title: 'Error fetching cart',
					message: 'Error fetching cart',
					color: 'red',
				});
			}
		};

		const fetchProducts = async () => {
			try {
				const productPromises = cart.map(async (product) => {
					const productObj = await fetchProduct(product.id);
					return { ...productObj, quantity: product.quantity };
				});
				const products = await Promise.all(productPromises);
				setProductList(products);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		if (token && !loading) {
			fetchCart().then(fetchProducts);
		}
	}, [token, loading, cart]);

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
						variant="filled">
						BUY NOW
					</Button>
				</Group>
			</Container>
		</div>
	);
}
