import { Group } from '@mantine/core';
import OrderListElement from './OrdersListElement';

interface Order {
	id: number;
	userId: number;
	price: number;
	createdAt: string;
	updatedAt: string;
}
interface ProductListProps {
	list: Order[];
}

export default function OrdersList({ list }: ProductListProps) {
	return (
		<Group p="sm">
			{list.map((order, id) => (
				<OrderListElement key={id} order={order} />
			))}
		</Group>
	);
}
