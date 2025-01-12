import { LoginClient } from '@/components/Authentication/LoginClient';
import classes from './page.module.css';

export default function LoginPage() {
	return (
		<div className={classes.main}>
			<LoginClient />
		</div>
	);
}
