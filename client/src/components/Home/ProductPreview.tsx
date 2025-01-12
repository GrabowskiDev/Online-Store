import { Card, Image, Text, Stack, Title, Button } from '@mantine/core';

import { Product } from '@/config/types';
import Link from 'next/link';

export default function ProductPreview({ product }: { product: Product }) {
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
						<Text w={500} size="lg" color="blue">
							${product.price.toFixed(2)}
						</Text>
						<Text size="sm" color="dimmed" lineClamp={2}>
							{product.description}
						</Text>
					</Stack>
				</Link>

				<Button variant="light" color="blue" fullWidth>
					Add to Cart
				</Button>
			</Stack>
		</Card>
	);
}
