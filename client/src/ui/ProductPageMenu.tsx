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

export default function ProductPageMenu() {
	const [value, { increment, decrement }] = useCounter(0, { min: 0, max: 10 });
	const [isTruncated, setIsTruncated] = useState(true);

	const toggleTruncation = () => {
		setIsTruncated(!isTruncated);
	};
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
						Title of the product
					</Title>
					<Title order={2} c="#212427" mb="xl" pb="md">
						22.50$
					</Title>
					<Text c="#212427" size="l" lineClamp={isTruncated ? 1 : undefined}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, delectus cum
						adipisci nesciunt modi, nulla voluptatem vel tempora atque eligendi qui
						exercitationem, quia nobis libero nisi inventore rem corrupti cupiditate.
					</Text>
					<Button onClick={toggleTruncation} variant="subtle" mt="md">
						{isTruncated ? 'Read more' : 'Read less'}
					</Button>
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
					Add to cart
				</Button>
			</Box>
		</Stack>
	);
}
