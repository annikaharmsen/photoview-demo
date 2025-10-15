import type {
	DetailedHTMLProps,
	HTMLAttributes,
	PropsWithChildren
} from 'react';
import { twMerge } from 'tailwind-merge';

export default function FormGrid({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={twMerge('grid grid-cols-1 m-auto gap-x-4', className)}
			{...props}
		></div>
	);
}

export const InputCell = ({
	className,
	children
}: PropsWithChildren<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>) => (
	<div
		className={twMerge(
			'flex flex-col text-left mb-4 w-full gap-1',
			className
		)}
	>
		{children}
	</div>
);
