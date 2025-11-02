import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface CenteredDivProps extends HTMLAttributes<'div'> {
	row?: boolean;
}

export default function CenteredLayout({
	children,
	className,
	row = false
}: CenteredDivProps) {
	return (
		<div
			className={twMerge(
				'flex items-center justify-center h-full py-12',
				row ? 'flex-row' : 'flex-col',
				className
			)}
		>
			{children}
		</div>
	);
}
