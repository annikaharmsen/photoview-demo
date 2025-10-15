import {
	useEffect,
	useState,
	type DetailedHTMLProps,
	type HTMLAttributes
} from 'react';
import { Button } from './buttons';
import { Minus, Plus } from 'lucide-react';
import { Input } from './form-elements';
import { twMerge } from 'tailwind-merge';

export default function QuantityInput({
	defaultValue,
	onChange,
	className,
	...props
}: Omit<
	DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
	'onChange'
> & {
	defaultValue: number;
	onChange: (value: number) => void;
}) {
	const [value, setValue] = useState<number>(defaultValue);

	useEffect(() => {
		onChange(value);
	}, [value]);

	return (
		<div
			className={twMerge(
				'grid grid-cols-3 items-center justify-items-center w-fit',
				className
			)}
			{...props}
		>
			<Button
				variant='ghost'
				className='p-0 size-fit'
				onClick={() => setValue(value - 1)}
			>
				<Minus className='size-6' />
			</Button>
			<Input
				className='text-center size-10 bg-white'
				type='number'
				value={value}
				onChange={(e) => setValue(parseFloat(e.target.value))}
			/>
			<Button
				variant='ghost'
				className='p-0 size-fit'
				onClick={() => setValue(value + 1)}
			>
				<Plus className='size-6' />
			</Button>
		</div>
	);
}
