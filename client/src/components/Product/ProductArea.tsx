'use client';
import { Container, Image, Loader, Text, Paper } from '@mantine/core';
import ProductPageMenu from './ProductPageMenu';
import { useEffect, useState } from 'react';
import ProductReviews from './ProductReviews';
import { fetchProduct, deleteReview } from '@/utils/api';
import { Product, Review as ReviewType } from '@/config/types';
import { SERVER_IP } from '@/config/config';
import { useAuth } from '@/context/AuthContext';

type ProductAreaProps = {
	productId: number;
};

export default function ProductArea({ productId }: ProductAreaProps) {
	const [product, setProduct] = useState<Product | null>(null);
	const [productLoading, setProductLoading] = useState(true);
	const [reviews, setReviews] = useState<ReviewType[]>([]);
	const [rating, setRating] = useState(0);
	const { user, loading } = useAuth();

	useEffect(() => {
		const getProduct = async () => {
			try {
				const data = await fetchProduct(productId);
				setProduct(data);
				setProductLoading(false);
			} catch {
				setProductLoading(false);
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

	const fetchReviews = async () => {
		try {
			const response = await fetch(`${SERVER_IP}/reviews/product/${productId}`);
			const data = await response.json();
			const sortedReviews = data.sort(
				(a: { userId: number | undefined }, b: { userId: number | undefined }) => {
					if (a.userId === user?.id) return -1;
					if (b.userId === user?.id) return 1;
					return 0;
				},
			);
			setReviews(sortedReviews);
		} catch (error) {
			console.error('Error fetching product:', error);
		}
	};

	function calculateRating() {
		let sum = 0;
		for (let i = 0; i < reviews.length; i++) {
			sum += reviews[i].rating;
		}
		console.log('calc');
		setRating(sum / reviews.length);
	}

	useEffect(() => {
		if (!loading) {
			fetchReviews();
		}
	}, [productId, user, loading]);

	useEffect(() => {
		calculateRating();
	}, [reviews]);

	return (
		<Container size={'xl'} maw={1200}>
			{productLoading ? (
				<Loader />
			) : !product ? (
				<Text>Product not found</Text>
			) : (
				<>
					<div style={gridStyle}>
						<Paper radius="lg" withBorder p={'3rem'}>
							<Image src={product.image} alt="Product" />
						</Paper>
						<ProductPageMenu
							product={product}
							rating={rating}
							reviews_amount={reviews.length}
						/>
					</div>

					<ProductReviews
						productId={productId}
						reviews={reviews}
						deleteReview={deleteReview}
						fetchReviews={fetchReviews}
					/>
				</>
			)}
		</Container>
	);
}
