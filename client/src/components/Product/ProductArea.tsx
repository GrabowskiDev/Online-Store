'use client';
import { Container, Image, Loader, Text, Paper } from '@mantine/core';
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

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: '8fr 7fr',
		gap: '2rem',
		marginBottom: '6rem',
	};

	return (
		<Container size={'xl'} maw={1200}>
			{loading ? (
				<Loader />
			) : !product ? (
				<Text>Product not found</Text>
			) : (
				<>
					<div style={gridStyle}>
						<Paper radius="lg" withBorder p={'3rem'}>
							<Image src={product.image} alt="Product" />
						</Paper>
						<ProductPageMenu product={product} />
					</div>

					<ProductReviews productId={productId} />
				</>
			)}
		</Container>
	);
}
