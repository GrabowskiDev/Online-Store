import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import ProductArea from '@/ui/ProductArea';
import classes from './page.module.css';

export default function ProductPage() {
	return (
		<div className={classes.main}>
			<HeaderMegaMenu />
			<ProductArea />
			<FooterSimple />
		</div>
	);
}
