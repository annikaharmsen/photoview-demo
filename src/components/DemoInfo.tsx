import { twMerge } from 'tailwind-merge';
import Link, { A, LinkButton } from './Link';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { H2 } from './headings';

export default function DemoInfo({
	horizontal = false,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	horizontal?: boolean;
}) {
	return (
		<div {...props}>
			<H2 className='text-3xl font-bold my-6 w-auto text-center'>
				To get started
			</H2>
			<ol
				className={twMerge(
					'text-lg flex justify-between *:grid text-center',
					horizontal
						? 'flex-row gap-x-16 *:flex-1 text-wrap'
						: 'flex-col gap-y-8 mb-6'
				)}
			>
				<li>
					<span className='text-6xl mb-4'>1</span>
					<p>
						<Link to='/register'>Create an account.</Link>
						<br />
						(For the purposes of this demo, you are not required to
						use a registered email)
					</p>
				</li>
				<li>
					<span className='text-6xl mb-4'>2</span>
					<p>
						<Link to='/upload'>Upload photos</Link>
						<br /> to your account
					</p>
				</li>
				<li>
					<span className='text-6xl mb-4'>3</span>
					<p>
						Explore the <Link to='/gallery'>gallery</Link>, add
						items to your cart, and mock a checkout with{' '}
						<A
							target='_blank'
							rel='relation_name'
							href='https://stripe.com'
						>
							Stripe
						</A>
						's test card:
						<br />
						<br />
						<span className='text-gray-600 text-md'>
							<LinkButton
								onClick={() => {
									navigator.clipboard.writeText(
										'4242424242424242'
									);
									alert('Card number copied to clipboard');
								}}
								className='relative group'
							>
								4242424242424242
								<span className='bg-blue-800/80 text-white hidden rounded-full absolute left-full ml-2 top-1/2 -translate-y-1/2 group-hover:block px-2 w-max text-sm'>
									Click to copy
								</span>
							</LinkButton>
							<br />
							CVC: Any 3 digits
							<br />
							Date: Any future date
						</span>
					</p>
				</li>
			</ol>
		</div>
	);
}
