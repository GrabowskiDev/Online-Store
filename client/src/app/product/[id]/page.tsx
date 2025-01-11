'use client';
import ProductArea from '@/ui/ProductArea';
import classes from './page.module.css';
import { useParams } from 'next/navigation';
import ProductReviews from '@/ui/ProductReviews';

export default function ProductPage() {
	const params = useParams<{ id: string }>();

	console.log(params.id);
	return (
		<div className={classes.main}>
			<ProductArea productId={Number(params.id)} />
		</div>
	);
}
