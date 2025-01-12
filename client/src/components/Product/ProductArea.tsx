'use client';
import { Container, Grid, Image, Loader, Text, Center, Paper } from '@mantine/core';
import ProductPageMenu from './ProductPageMenu';
import { useEffect, useState } from 'react';
import ProductReviews from './ProductReviews';
import { fetchProduct } from '@/utils/api';
import { Product } from '@/config/types';

type ProductAreaProps = {
	productId: number;
};

export default function ProductArea({ productId }: ProductAreaProps) {
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getProduct = async () => {
			try {
				const data = await fetchProduct(productId);
				setProduct(data);
				setLoading(false);
			} catch {
				setLoading(false);
			}
		};

		getProduct();
	}, [productId]);

	return (
		<Container size={'xl'}>
			{loading ? (
				<Loader />
			) : !product ? (
				<Text>Product not found</Text>
			) : (
				<>
					<Grid gutter="xl" justify="space-between" align="stretch" mb="xl">
						<Grid.Col span={7}>
							<Center>
								<Paper radius="lg" withBorder p={'3rem'} style={{ width: '100%' }}>
									<Image
										src={product.image}
										alt="Product"
										style={{
											objectFit: 'contain',
											maxHeight: '800px',
										}}
									/>
									{/* </Box> */}
								</Paper>
							</Center>
						</Grid.Col>
						<Grid.Col p="none" span={5}>
							<ProductPageMenu product={product} />
						</Grid.Col>
					</Grid>

					<ProductReviews productId={productId} />
				</>
			)}
		</Container>
	);
}
