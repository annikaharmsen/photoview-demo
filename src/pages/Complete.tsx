import Card from '../components/Card';
import { H1 } from '../components/headings';
import Link from '../components/Link';
import AppLayout from '../layouts/AppLayout';

export default function Complete() {
	return (
		<AppLayout gallery>
			<H1>Success!</H1>
			<Card>
				<span>
					Your order has been placed!{' '}
					<Link to='/gallery'>Return to gallery</Link> to continue
					shopping.
				</span>
			</Card>
		</AppLayout>
	);
}
