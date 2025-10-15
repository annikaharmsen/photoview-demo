import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Card({ className, children }: HTMLAttributes<'div'>) {
	return (
		<div
			className={twMerge(
				'bg-white shadow rounded-2xl p-10 w-auto max-w-full md:w-fit md:min-w-100 md:max-w-200 gap-2 m-6',
				className
			)}
		>
			{children}
		</div>
	);
}

export const CardSection = ({
	className,
	children,
	variant,
	...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	variant?: 'default' | 'outline';
}) => {
	const getStyleVariant = () => {
		switch (variant) {
			case 'outline':
				return 'border border-gray-500';
				break;
			case 'default':
			default:
				return 'bg-gray-100';
				break;
		}
	};
	return (
		<div
			className={twMerge('rounded-lg p-4', getStyleVariant(), className)}
			{...props}
		>
			{children}
		</div>
	);
};
