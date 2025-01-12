import { Group } from '@mantine/core';
import ProductListElement from './ProductListElement';
import { Product } from '@/config/types';

interface ProductListProps {
	list: Product[];
}

export default function ProductList({ list }: ProductListProps) {
	return (
		<Group p="sm">
			{list.map((product, id) => (
				<ProductListElement key={id} product={product} />
			))}
		</Group>
	);
}
