import { H1 } from '../components/headings';
import Link from '../components/Link';
import CenteredLayout from '../layouts/CenteredLayout';

export default function NotFound() {
	return (
		<CenteredLayout className='min-h-screen'>
			<H1>404 Not found</H1>
			<Link to='/'>Return to landing page</Link>
		</CenteredLayout>
	);
}
