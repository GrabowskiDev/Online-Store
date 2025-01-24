import { Group } from '@mantine/core';
import OrderProductListElement from './OrderProductListElement';

interface Product {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: { rate: number; count: number };
	quantity: number;
	cartId: number;
}

interface ProductListProps {
	list: Product[];
}

export default function OrderProductList({ list }: ProductListProps) {
	return (
		<Group p="sm">
			{list.map((product, id) => (
				<OrderProductListElement key={id} product={product} />
			))}
		</Group>
	);
}
