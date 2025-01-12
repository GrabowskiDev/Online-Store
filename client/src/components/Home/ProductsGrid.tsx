'use client';
import { SimpleGrid } from '@mantine/core';
import ProductPreview from './ProductPreview';
import { Product } from '@/config/types';
import { fetchAllProducts } from '@/utils/api';
import { useState, useEffect } from 'react';

interface ProductsGridProps {
	search: string;
	categories: string[];
	sort: string | null;
}

export default function ProductsGrid({ search, categories, sort }: ProductsGridProps) {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchAllProducts().then((data) => setProducts(data));

		if (search) {
			setProducts((prev) =>
				prev.filter((product) =>
					product.title.toLowerCase().includes(search.toLowerCase()),
				),
			);
		}

		if (categories.length > 0) {
			setProducts((prev) =>
				prev.filter((product) => categories.includes(product.category)),
			);
		}

		if (sort === 'A-Z') {
			setProducts((prev) => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
		}

		if (sort === 'Z-A') {
			setProducts((prev) => [...prev].sort((a, b) => b.title.localeCompare(a.title)));
		}

		if (sort === 'Price ascending') {
			setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
		}

		if (sort === 'Price descending') {
			setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
		}

		if (sort === 'Rating ascending') {
			setProducts((prev) => [...prev].sort((a, b) => a.rating.rate - b.rating.rate));
		}

		if (sort === 'Rating descending') {
			setProducts((prev) => [...prev].sort((a, b) => b.rating.rate - a.rating.rate));
		}
	}, [search, categories, sort]);

	return (
		<SimpleGrid cols={2} verticalSpacing="xl" spacing="xl">
			{products.map((product) => (
				<ProductPreview key={product.id} product={product} />
			))}
		</SimpleGrid>
	);
}
