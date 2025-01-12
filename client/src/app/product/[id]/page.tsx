'use client';
import ProductArea from '@/components/Product/ProductArea';
import classes from './page.module.css';
import { useParams } from 'next/navigation';

export default function ProductPage() {
	const params = useParams<{ id: string }>();

	console.log(params.id);
	return (
		<div className={classes.main}>
			<ProductArea productId={Number(params.id)} />
		</div>
	);
}
