import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import type { CartItem } from '../types/app';
import { H1, H2, H3 } from './headings';
import QuantityInput from './QuantityInput';
import useCart from '../hooks/use-cart';
import { twMerge } from 'tailwind-merge';

export const CartItemImg = ({
	item,
	...props
}: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
	item: CartItem;
}) => (
	<img
		src={
			import.meta.env.VITE_API_URL +
			'/uploads/optimized/' +
			item.photo.image_url
		}
		alt={item.photo.description || 'Photo'}
		{...props}
	/>
);

export const CartItemInfo = ({
	item,
	headingComponent: HeadingComponent = H3,
	showDescription = false,
	onQtyChange,
	className,
	...props
}: DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
	item: CartItem;
	headingComponent?: typeof H1 | typeof H2 | typeof H3;
	showDescription?: boolean;
	onQtyChange?: (value: number) => void;
}) => {
	const cart = useCart();

	return (
		<div className={twMerge('flex flex-col', className)} {...props}>
			<HeadingComponent
				className={
					'col-span-2 m-0 md:my-4 ' +
					(showDescription ? ' self-start' : ' self-end')
				}
			>
				{item.format.name}
			</HeadingComponent>
			<div className='flex gap-y-4 md:flex-row flex-col'>
				{showDescription && item.format.description && (
					<p className='grow'>{item.format.description || ''}</p>
				)}
				<div className='flex flex-col items-center md:items-end'>
					{onQtyChange ? (
						<QuantityInput
							defaultValue={item.quantity}
							onChange={onQtyChange}
							className='mb-4'
						/>
					) : (
						<span>Quantity: {item.quantity}</span>
					)}
					<span>Unit Price: ${item.format.price}</span>
					<span>
						Item Total: ${cart.getItemTotal(item).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};
