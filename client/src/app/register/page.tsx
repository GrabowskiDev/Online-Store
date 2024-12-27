import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import { RegisterClient } from '@/ui/RegisterClient';
import classes from './page.module.css';

export default function LoginPage() {
	return (
		<div className={classes.main}>
			<HeaderMegaMenu />
			<RegisterClient />
			<FooterSimple />
		</div>
	);
}
