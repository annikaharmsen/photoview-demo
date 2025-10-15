import type { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const H1 = ({ className, children }: HTMLAttributes<'h1'>) => (
	<h1 className={twMerge('w-fit text-5xl md:text-6xl m-4', className)}>
		{children}
	</h1>
);

export const H2 = ({ className, children }: HTMLAttributes<'h2'>) => (
	<h2 className={twMerge('w-fit text-3xl md:text-4xl m-4', className)}>
		{children}
	</h2>
);

export const H3 = ({ className, children }: HTMLAttributes<'h2'>) => (
	<h2 className={twMerge('w-fit text-lg md:text-2xl m-4', className)}>
		{children}
	</h2>
);
