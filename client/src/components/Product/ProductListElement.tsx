import {
	Group,
	Paper,
	Image,
	Title,
	ActionIcon,
	NumberInput,
	Stack,
	Text,
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import { IconMinus, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Product } from '@/config/types';

interface ProductListElementProps {
	product: Product;
}

export default function ProductListElement({ product }: ProductListElementProps) {
	const [productAmount, { increment, decrement }] = useCounter(product.quantity, {
		min: 0,
		max: 10,
	});
	const [price, SetPrice] = useState(product.price);

	useEffect(() => {
		SetPrice(product.price * productAmount);
	}, [product.price, productAmount]);

	return (
		<>
			<Paper p="md" shadow="xs" w={'100%'}>
				<Group justify="space-between">
					<Group align="top" gap="xl">
						<Image src={product.image} alt={'image'} h={'100%'} w={'4rem'} />
						<Stack>
							<Title>{product.title}</Title>
							<Text>$ {price.toFixed(2)}</Text>
						</Stack>
					</Group>
					<Group>
						<ActionIcon variant="default" size="xl" radius="md" onClick={decrement}>
							<IconMinus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
						<NumberInput
							size="md"
							defaultValue={0}
							value={productAmount}
							min={0}
							max={10}
							readOnly
							hideControls
							style={{ width: '60px', textAlign: 'center' }}></NumberInput>
						<ActionIcon variant="default" size="xl" radius="md" onClick={increment}>
							<IconPlus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
					</Group>
				</Group>
			</Paper>
		</>
	);
}
