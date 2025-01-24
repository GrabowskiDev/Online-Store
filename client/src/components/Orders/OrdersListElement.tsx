import { Group, Paper, Title, Text } from '@mantine/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Order {
	id: number;
	userId: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}
interface ProductListElementProps {
	order: Order;
}

export default function OrdersListElement({ order }: ProductListElementProps) {
	const [price, SetPrice] = useState(order.price);

	useEffect(() => {
		SetPrice(order.price);
	}, [order.price]);

	return (
		<>
			<Paper p="md" shadow="xs" w={'100%'}>
				<Link href={`/orders/${order.id}`}>
					<Group justify="space-between">
						<Title order={2}>Order ID: {order.id}</Title>
						<Title order={3}>Price: {price}</Title>
					</Group>
					<Group justify="space-between">
						<Text>Ordered on: {format(new Date(order.createdAt), 'MMMM dd, yyyy')}</Text>
					</Group>
				</Link>
			</Paper>
		</>
	);
}
