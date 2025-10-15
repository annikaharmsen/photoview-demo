import Card from '../components/Card';
import CenteredLayout from '../layouts/CenteredLayout';
import DemoInfo from '../components/DemoInfo';
import { H1 } from '../components/headings';

export default function Welcome() {
	return (
		<CenteredLayout>
			<H1 className='text-center'>
				Welcome to Photoview
				<br />
				<span className='relative text-3xl text-gray-500 -top-4'>
					the demo
				</span>
			</H1>
			<Card>
				<DemoInfo horizontal className='hidden lg:block' />
				<DemoInfo className='block lg:hidden' />
			</Card>
		</CenteredLayout>
	);
}
