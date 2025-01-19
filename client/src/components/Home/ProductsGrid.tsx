'use client';
import { SimpleGrid, Loader, Center } from '@mantine/core';
import ProductPreview from './ProductPreview';
import { Product, Review as ReviewType } from '@/config/types';
import { fetchAllProducts } from '@/utils/api';
import { useState, useEffect } from 'react';
import { SERVER_IP } from '@/config/config';

interface ProductsGridProps {
	search: string;
	categories: string[];
	sort: string | null;
}

interface Rating {
	rate: number;
	count: number;
}

export default function ProductsGrid({ search, categories, sort }: ProductsGridProps) {
	const [allProducts, setAllProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const data = await fetchAllProducts();

			const productsWithRatings = await Promise.all(
				data.map(async (product: Product) => {
					product.rating = { rate: 0, count: 0 };
					const response = await fetchReviews(product.id);
					product.rating = response;
					return product;
				}),
			);

			setAllProducts(productsWithRatings);
			setFilteredProducts(productsWithRatings);
			setLoading(false);
		};

		fetchProducts();
	}, []);

	const fetchReviews = async (productId: number): Promise<Rating> => {
		function calculateRating(reviews: ReviewType[]): number {
			let sum = 0;
			if (reviews.length === 0) return 0;
			for (let i = 0; i < reviews.length; i++) {
				sum += reviews[i].rating;
			}
			return sum / reviews.length;
		}

		try {
			const response = await fetch(`${SERVER_IP}/reviews/product/${productId}`);
			const data: ReviewType[] = await response.json();
			const rating = { rate: calculateRating(data), count: data.length };
			return rating;
		} catch (error) {
			console.error('Error fetching product:', error);
			return { rate: 0, count: 0 };
		}
	};

	useEffect(() => {
		let products = [...allProducts];

		if (search) {
			products = products.filter((product) =>
				product.title.toLowerCase().includes(search.toLowerCase()),
			);
		}

		if (categories.length > 0) {
			products = products.filter((product) => categories.includes(product.category));
		}

		if (sort === 'A-Z') {
			products = products.sort((a, b) => a.title.localeCompare(b.title));
		}

		if (sort === 'Z-A') {
			products = products.sort((a, b) => b.title.localeCompare(a.title));
		}

		if (sort === 'Price ascending') {
			products = products.sort((a, b) => a.price - b.price);
		}

		if (sort === 'Price descending') {
			products = products.sort((a, b) => b.price - a.price);
		}

		if (sort === 'Rating ascending') {
			products = products.sort((a, b) => a.rating.rate - b.rating.rate);
		}

		if (sort === 'Rating descending') {
			products = products.sort((a, b) => b.rating.rate - a.rating.rate);
		}

		setFilteredProducts(products);
	}, [search, categories, sort, allProducts]);

	if (loading) {
		return (
			<Center style={{ height: '20vh' }}>
				<Loader />
			</Center>
		);
	}

	return (
		<SimpleGrid cols={2} verticalSpacing="xl" spacing="xl">
			{filteredProducts.map((product) => (
				<ProductPreview key={product.id} product={product} />
			))}
		</SimpleGrid>
	);
}
