import { RegisterClient } from '@/ui/RegisterClient';
import classes from './page.module.css';

export default function RegisterPage() {
	return (
		<div className={classes.main}>
			<RegisterClient />
		</div>
	);
}
