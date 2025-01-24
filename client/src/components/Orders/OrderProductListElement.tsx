import { Group, Paper, Image, Title, Stack, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
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

export default function OrderProductListElement({ product }: ProductListElementProps) {
	const [price, SetPrice] = useState(product.price);

	useEffect(() => {
		SetPrice(product.price * product.quantity);
	}, [product.price, product.quantity]);

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
				</Group>
			</Paper>
		</>
	);
}
