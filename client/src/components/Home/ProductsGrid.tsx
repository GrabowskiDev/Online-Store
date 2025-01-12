'use client';
import { SimpleGrid } from '@mantine/core';
import ProductPreview from './ProductPreview';
import { Product } from '@/config/types';
import { fetchAllProducts } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function ProductsGrid() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchAllProducts().then((data) => setProducts(data));
	}, []);

	return (
		<SimpleGrid cols={2} verticalSpacing="xl" spacing="xl">
			{products.map((product) => (
				<ProductPreview key={product.id} product={product} />
			))}
		</SimpleGrid>
	);
}
