import { RegisterClient } from '@/ui/RegisterClient';
import classes from './page.module.css';

export default function LoginPage() {
	return (
		<div className={classes.main}>
			<RegisterClient />
		</div>
	);
}
