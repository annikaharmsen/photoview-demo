import type {
	DetailedHTMLProps,
	HTMLAttributes,
	InputHTMLAttributes
} from 'react';
import { twMerge } from 'tailwind-merge';
import { LinkButton } from './Link';

const styles =
	'rounded-lg bg-blue-500 px-4 py-1 text-white hover:bg-blue-800 active:bg-blue-800';

export const Button = ({
	className,
	children,
	variant,
	...props
}: HTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'ghost' }) => {
	let buttonStyles = styles;

	switch (variant) {
		case 'default':
			buttonStyles = styles;
			break;
		case 'ghost':
			buttonStyles =
				'bg-transparent text-blue-500 hover:bg-gray-500/20 active:bg-gray-500/20 rounded-full p-3';
			break;
	}

	return (
		<button className={twMerge(buttonStyles, className)} {...props}>
			{children}
		</button>
	);
};

export const SubmitButton = ({
	className,
	id,
	children,
	...props
}: Omit<
	DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	'children'
> & { children?: string | number | readonly string[] }) => (
	<input
		id={id || 'submit'}
		type='submit'
		className={twMerge(styles, className)}
		value={children || props.value || 'Submit'}
		{...props}
	/>
);

export const CopyButton = ({
	children,
	copiedAlert = 'Saved to clipboard',
	tooltipText = 'Click to copy'
}: {
	children: string;
	copiedAlert?: string;
	tooltipText?: string;
}) => (
	<LinkButton
		onClick={() => {
			navigator.clipboard.writeText(children);
			alert(copiedAlert);
		}}
		className='relative group cursor-copy'
	>
		{children}
		<span className='bg-blue-800/80 text-white hidden rounded-full absolute left-full ml-2 top-1/2 -translate-y-1/2 group-hover:block px-2 w-max text-sm'>
			{tooltipText}
		</span>
	</LinkButton>
);
