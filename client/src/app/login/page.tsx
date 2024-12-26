import { HeaderMegaMenu } from '@/ui/HeaderMegaMenu';
import { FooterSimple } from '@/ui/FooterSimple';
import { LoginClient } from '@/ui/LoginClient';
import classes from './page.module.css';

export default function LoginPage() {
	return (
		<div className={classes.main}>
			<HeaderMegaMenu />
			<LoginClient />
			<FooterSimple />
		</div>
	);
}
