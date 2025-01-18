import {
	Group,
	Paper,
	Image,
	Title,
	ActionIcon,
	NumberInput,
	Stack,
	Text,
	CloseButton,
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useCallback, useEffect, useState } from 'react';
import { SERVER_IP } from '@/config/config';
import { debounce } from '@/utils/debounce';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

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

interface ProductListElementProps {
	product: Product;
}

export default function ProductListElement({ product }: ProductListElementProps) {
	const [productAmount, { increment, decrement }] = useCounter(product.quantity, {
		min: 1,
		max: 999,
	});
	const [price, SetPrice] = useState(product.price);
	const { token } = useAuth();

	useEffect(() => {
		SetPrice(product.price * productAmount);
	}, [product.price, productAmount]);

	const handleRemove = async () => {
		try {
			const response = await fetch(`${SERVER_IP}/cart/${product.cartId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				throw new Error('Failed to remove product from cart');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateCart = async (quantity: number) => {
		try {
			const response = await fetch(`${SERVER_IP}/cart/${product.cartId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ quantity }),
			});
			if (!response.ok) {
				throw new Error('Failed to update cart');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const debouncedUpdateCart = useCallback(debounce(updateCart, 1000), [token]);

	useEffect(() => {
		debouncedUpdateCart(productAmount);
	}, [productAmount, debouncedUpdateCart]);

	return (
		<>
			<Paper p="md" shadow="xs" w={'100%'}>
				<Group justify="space-between">
					<Link href={`/product/${product.id}`} passHref>
						<Group align="top" gap="xl">
							<Image src={product.image} alt={'image'} h={'100%'} w={'4rem'} />
							<Stack>
								<Title>{product.title}</Title>
								<Text>$ {price.toFixed(2)}</Text>
							</Stack>
						</Group>
					</Link>
					<Group>
						<ActionIcon variant="default" size="xl" radius="md" onClick={decrement}>
							<IconMinus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
						<NumberInput
							size="md"
							defaultValue={0}
							value={productAmount}
							min={0}
							max={999}
							readOnly
							hideControls
							style={{ width: '60px', textAlign: 'center' }}></NumberInput>
						<ActionIcon variant="default" size="xl" radius="md" onClick={increment}>
							<IconPlus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
						<CloseButton onClick={handleRemove} />
					</Group>
				</Group>
			</Paper>
		</>
	);
}
