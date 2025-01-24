import { Card, Image, Text, Stack, Title, Button, Group, Rating } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { Product } from '@/config/types';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { addProductToCart } from '@/utils/api';

export default function ProductPreview({ product }: { product: Product }) {
	const { token } = useAuth();

	const addToCart = async () => {
		if (!token) {
			notifications.show({
				title: 'You need to be logged in to add a product to cart',
				message: 'Please log in or register to add a product to cart',
				color: 'red',
			});
		} else {
			try {
				const response = await addProductToCart(product.id, 1, token, product.price);
				if (!response!.ok) {
					notifications.show({
						title: 'Error',
						message: 'An error has occured',
						color: 'red',
					});
					return;
				}
				notifications.show({
					title: 'Product added to cart',
					message: `${product.title} has been added to your cart`,
					color: 'green',
				});
			} catch (error) {
				console.error('Error adding product to cart:', error);
				throw error;
			}
		}
	};

	return (
		<Card shadow="sm" p="xl" radius="md" withBorder>
			<Link href={`/product/${product.id}`}>
				<Card.Section>
					<Image src={product.image} alt={product.title} height={160} fit="contain" />
				</Card.Section>
			</Link>

			<Stack justify="space-between" mt="md" h={'100%'}>
				<Link href={`/product/${product.id}`}>
					<Stack gap="sm" mt="md">
						<Title order={3}>{product.title}</Title>
						<Group>
							<Rating fractions={4} value={product.rating.rate} readOnly />
							<Text size="sm" color="dimmed">
								({product.rating.count})
							</Text>
						</Group>
						<Text w={500} size="lg" color="blue">
							${product.price.toFixed(2)}
						</Text>
						<Text size="sm" color="dimmed" lineClamp={2}>
							{product.description}
						</Text>
					</Stack>
				</Link>

				<Button variant="light" color="blue" fullWidth onClick={addToCart}>
					Add to Cart
				</Button>
			</Stack>
		</Card>
	);
}
