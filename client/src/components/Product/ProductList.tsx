import { Group } from '@mantine/core';
import ProductListElement from './ProductListElement';

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
	onUpdate: () => void;
}

export default function ProductList({ list, onUpdate }: ProductListProps) {
	return (
		<Group p="sm">
			{list.map((product, id) => (
				<ProductListElement key={id} product={product} onUpdate={onUpdate} />
			))}
		</Group>
	);
}
