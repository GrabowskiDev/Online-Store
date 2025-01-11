'use client';
import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import ProductArea from '@/ui/ProductArea';
import classes from './page.module.css';
import { useParams } from 'next/navigation';

export default function ProductPage() {
	const params = useParams<{ id: string }>();

	console.log(params.id);
	return (
		<div className={classes.main}>
			<HeaderMegaMenu />
			<ProductArea productId={Number(params.id)} />
			<FooterSimple />
		</div>
	);
}
