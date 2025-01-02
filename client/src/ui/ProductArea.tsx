'use client';
import { Box, Grid, Image, Loader, Text } from '@mantine/core';
import ProductPageMenu from './ProductPageMenu';
import { useEffect, useState } from 'react';

type ProductAreaProps = {
	productId: number;
};

type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
};

export default function ProductArea({ productId }: ProductAreaProps) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		try {
			fetch(`https://fakestoreapi.com/products/${productId}`)
				.then((res) => res.json())
				.then((data) => {
					setProduct(data);
					console.log(data.image);
				});
		} catch (error) {
			console.error('Error fetching product:', error);
		} finally {
			setLoading(false);
		}
	}, [productId]);

	if (loading) {
		return <Loader />;
	}

	if (!product) {
		return <Text>Product not found</Text>;
	}

	return (
		<Grid style={{ height: '100%' }}>
			<Grid.Col span={2}></Grid.Col>
			<Grid.Col span={5} style={{ display: 'flex', justifyContent: 'center' }}>
				<Box style={{ height: '85%', width: '85%' }}>
					<Image
						src={product.image}
						alt="Product"
						style={{
							border: '1px solid black',
							objectFit: 'contain',
							marginLeft: 'auto',
							marginRight: 'auto',
							maxHeight: '800px',
						}}
					/>
				</Box>
			</Grid.Col>
			<Grid.Col p="none" span={4}>
				<ProductPageMenu product={product} />
			</Grid.Col>
			<Grid.Col span={1}></Grid.Col>
		</Grid>
	);
}
