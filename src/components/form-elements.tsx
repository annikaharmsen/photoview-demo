import type {
	DetailedHTMLProps,
	InputHTMLAttributes,
	LabelHTMLAttributes,
	SelectHTMLAttributes,
	TextareaHTMLAttributes
} from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({
	className,
	...props
}: InputHTMLAttributes<HTMLInputElement>) => (
	<input
		className={twMerge(
			'px-2 py-1 bg-neutral-100 rounded text-sm inset-shadow-xs w-full',
			className
		)}
		{...props}
	/>
);

export const TextArea = ({
	className,
	...props
}: DetailedHTMLProps<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement
>) => (
	<textarea
		className={twMerge(
			'px-2 py-1 bg-neutral-100 rounded text-sm inset-shadow-xs w-full',
			className
		)}
		{...props}
	/>
);

export const Label = ({
	className,
	children,
	...props
}: DetailedHTMLProps<
	LabelHTMLAttributes<HTMLLabelElement>,
	HTMLLabelElement
>) => (
	<label className={twMerge('text-sm', className)} {...props}>
		{children}
	</label>
);

export const Error = ({
	children,
	className,
	...props
}: DetailedHTMLProps<
	React.HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>) => (
	<span
		className={twMerge('text-red-600 text-xs text-left', className)}
		{...props}
	>
		{children}
	</span>
);

export const Success = ({
	children,
	className,
	...props
}: DetailedHTMLProps<
	React.HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
>) => (
	<span
		className={twMerge('text-green-600 text-xs text-left', className)}
		{...props}
	>
		{children}
	</span>
);

export const Select = ({
	className,
	children,
	...props
}: DetailedHTMLProps<
	SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
>) => (
	<select
		className={twMerge(
			'bg-gray-200 px-2 py-1 rounded text-sm hover:bg-gray-300',
			className
		)}
		{...props}
	>
		{children}
	</select>
);

export const FileInput = ({
	className,
	...props
}: DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>) => (
	<input
		className={twMerge(
			'block bg-gray-200 border rounded px-2 py-1 hover:bg-gray-300 text-sm',
			className
		)}
		type='file'
		{...props}
	/>
);
