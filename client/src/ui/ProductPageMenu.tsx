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
} from '@mantine/core';
import { useCounter } from '@mantine/hooks';
import {
	IconPlus,
	IconMinus,
	IconCashRegister,
	IconShoppingCart,
} from '@tabler/icons-react';
import { useState } from 'react';

type ProductPageMenuProps = {
	product: {
		id: number;
		title: string;
		price: number;
		description: string;
		category: string;
		image: string;
		rating: { rate: number; count: number };
	};
};

export default function ProductPageMenu({ product }: ProductPageMenuProps) {
	const [value, { increment, decrement }] = useCounter(0, { min: 0, max: 10 });
	const [showDescription, setShowDescription] = useState(false);

	return (
		<Stack
			justify="space-between"
			style={{
				width: '90%',
				height: '80%',
			}}>
			<Box>
				<Paper shadow="xs" p="md">
					<Title order={1} c="#212427" pb="md">
						{product.title}
					</Title>
					<Title order={2} c="#212427" mb="xl" pb="md">
						{product.price}$
					</Title>
					<Box style={{ height: '200px', overflowY: 'auto' }}>
						{showDescription && (
							<Text c="#212427" size="l">
								{product.description}
							</Text>
						)}
						<Button
							onClick={() => setShowDescription(!showDescription)}
							variant="subtle"
							mt={showDescription ? 'xs' : 0}
							pl={0}
							pr={0}>
							{showDescription ? 'Hide description' : 'Show description'}
						</Button>
					</Box>
				</Paper>
			</Box>
			<Box p="md"></Box>
			<Box p="md">
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
				<Button
					justify="center"
					h={44}
					fullWidth
					rightSection={<IconShoppingCart size={24} style={{ color: 'black' }} />}
					leftSection={<span />}
					variant="default"
					mt="xl">
					Add to cart
				</Button>
				<Button
					justify="center"
					h={44}
					fullWidth
					rightSection={<IconCashRegister size={24} style={{ color: 'white' }} />}
					leftSection={<span />}
					variant="filled"
					mt="md">
					Buy now
				</Button>
			</Box>
		</Stack>
	);
}