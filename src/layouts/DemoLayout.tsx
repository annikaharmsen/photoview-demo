import { useState, type PropsWithChildren } from 'react';
import { LucideList, X } from 'lucide-react';
import { Button } from '../components/buttons';
import DemoInfo from '../components/DemoInfo';
import Card from '../components/Card';

export default function DemoLayout({ children }: PropsWithChildren) {
	const [showModal, setShowModal] = useState<boolean>(false);

	const WelcomeButton = () => (
		<Button
			variant='ghost'
			className='lg:hidden fixed bottom-4 left-4 z-100 text-black bg-gray-500/20 hover:bg-gray-500/40 active:bg-gray-500/40 flex items-center gap-2'
			onClick={() => setShowModal(true)}
		>
			<LucideList className='size-6 inline' /> Demo Instructions
		</Button>
	);

	const DemoModal = () => (
		<div
			className='bg-gray-500/20 h-screen w-screen fixed z-200 left-0 top-0 lg:hidden'
			onClick={() => setShowModal(false)}
		>
			<Card
				onClick={(e) => e.stopPropagation()}
				className='m-6 py-0 absolute max-h-[calc(100vh-3rem)] flex flex-col overflow-hidden'
			>
				<Button
					className='absolute top-2 right-2 p-1 text-red-700 z-10'
					variant='ghost'
					onClick={() => setShowModal(false)}
				>
					<X className='size-6' />
				</Button>
				<DemoInfo className='flex items-center flex-col text-center justify-around flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]' />
			</Card>
		</div>
	);

	const DemoSidebar = () => (
		<DemoInfo className='sticky top-0 w-100 lg:flex items-center flex-col text-center justify-around hidden h-screen bg-white p-4' />
	);

	return (
		<div className='min-h-screen w-full flex'>
			<WelcomeButton />
			{showModal && <DemoModal />}
			<DemoSidebar />
			<div className='lg:flex-grow relative w-full'>{children}</div>
		</div>
	);
}
