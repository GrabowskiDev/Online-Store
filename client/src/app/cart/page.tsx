'use client';
import { Container, Paper, Group, Button, Title } from '@mantine/core';
import classes from './page.module.css';
import ProductList from '@/ui/ProductList';
import { useEffect, useState } from 'react';
import { IconCashRegister } from '@tabler/icons-react';

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
	const [cart, setCart] = useState<CartProduct[]>([
		{ id: 2, quantity: 1 },
		{ id: 3, quantity: 4 },
	]);

	const [productList, setProductList] = useState<Product[]>([]);
	const [totalPrice, setTotalPrice] = useState(0);

	function addToCartList(product: CartProduct) {
		setCart((prevCart) => [...prevCart, product]);
	}

	function addToProductList(product: Product, quantity: number) {
		product.quantity = quantity;
		setProductList((prevList) => [...prevList, product]);
	}

	useEffect(() => {
		cart.map((product) => {
			try {
				fetch(`https://fakestoreapi.com/products/${product.id}`)
					.then((res) => res.json())
					.then((data) => {
						addToProductList(data, product.quantity);
					});
			} catch (error) {
				console.error('Error fetching product:', error);
			}
		});
	}, [cart]);

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
