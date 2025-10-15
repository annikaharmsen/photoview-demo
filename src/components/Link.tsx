import type {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ComponentProps,
	DetailedHTMLProps
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function Link({
	className,
	children,
	...props
}: ComponentProps<typeof RouterLink>) {
	return (
		<RouterLink
			className={twMerge('text-blue-500 hover:underline', className)}
			{...props}
		>
			{children}
		</RouterLink>
	);
}

export const A = ({
	className,
	children,
	...props
}: DetailedHTMLProps<
	AnchorHTMLAttributes<HTMLAnchorElement>,
	HTMLAnchorElement
>) => (
	<a
		className={twMerge('text-blue-500 hover:underline', className)}
		{...props}
	>
		{children}
	</a>
);

export const LinkButton = ({
	className,
	children,
	...props
}: DetailedHTMLProps<
	ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>) => (
	<button
		className={twMerge('text-blue-500 hover:underline', className)}
		{...props}
	>
		{children}
	</button>
);
