'use client';
import {
	Box,
	Paper,
	Title,
	Text,
	Button,
	ActionIcon,
	Group,
	Stack,
	NumberInput,
	Center,
	Rating,
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import {
	IconPlus,
	IconMinus,
	IconCashRegister,
	IconShoppingCart,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Product } from '@/config/types';

type ProductPageMenuProps = {
	product: Product;
};

export default function ProductPageMenu({ product }: ProductPageMenuProps) {
	const [value, { increment, decrement }] = useCounter(0, { min: 0, max: 10 });
	const [showDescription, setShowDescription] = useState(false);

	return (
		<Stack justify="space-between">
			<Paper shadow="xs" p="md" ml="sm" mr="sm" mb={'2rem'} h={'100%'} w={'100%'}>
				<Title order={1} c="#212427" pb="md">
					{product.title}
				</Title>
				<Group mb="md">
					<Rating value={product.rating.rate} fractions={4} readOnly color="#FFD700" />
					<Text size="sm" c="#212427">
						{product.rating.count} reviews
					</Text>
				</Group>
				<Title order={2} c="#212427" mb="xl" pb="md">
					$ {product.price.toFixed(2)}
				</Title>
				{showDescription && (
					// <Text c="#212427" size="l">
					// 	{product.description}
					// </Text>
					<p>{product.description}</p>
				)}

				<Button
					onClick={() => setShowDescription(!showDescription)}
					variant="subtle"
					mt={showDescription ? 'xs' : 0}
					pl={0}
					pr={0}>
					{showDescription ? 'Hide description' : 'Show description'}
				</Button>
			</Paper>
			<Box mt="md" ml="sm" mr="sm" mb="md">
				<Group gap={'0px'} justify="stretch">
					<Group>
						<ActionIcon variant="default" size="xl" radius="md" onClick={decrement}>
							<IconMinus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
						<NumberInput
							size="md"
							defaultValue={0}
							value={value}
							min={0}
							max={10}
							readOnly
							hideControls></NumberInput>
						<ActionIcon variant="default" size="xl" radius="md" onClick={increment}>
							<IconPlus color="var(--mantine-color-gray-text)" />
						</ActionIcon>
					</Group>
					<Center style={{ flexGrow: '1' }}>
						<Text c="#0A0" size="xl">
							In Stock!
						</Text>
					</Center>
				</Group>
				<Button
					justify="center"
					h={44}
					fullWidth
					rightSection={<IconShoppingCart size={24} style={{ color: 'black' }} />}
					leftSection={<span />}
					variant="default"
					mt="xl">
					ADD TO CART
				</Button>
				<Button
					justify="center"
					h={44}
					fullWidth
					rightSection={<IconCashRegister size={24} style={{ color: 'white' }} />}
					leftSection={<span />}
					variant="filled"
					mt="md">
					BUY NOW
				</Button>
			</Box>
		</Stack>
	);
}
