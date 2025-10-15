import { useState } from 'react';
import type { CartItem, CartItems } from '../types/app';
import useHTTP from './use-http';

export default function useCart() {
	const [items, setItems] = useState<CartItems>([]);
	const [errors, setErrors] = useState<{ get?: string; update?: string }>({});
	const send = useHTTP();

	const getItems = () => {
		try {
			send(import.meta.env.VITE_API_URL + 'app/cart.php', {
				method: 'GET'
			}).then((data) => setItems(data.items));
		} catch (error) {
			setErrors({ ...errors, get: (error as Error).message });
		}
	};

	const updateItemQuantity = (cartItemID: number, quantity: number) => {
		try {
			send(import.meta.env.VITE_API_URL + 'app/cart.php', {
				method: 'PUT',
				body: JSON.stringify({
					cart_item_id: cartItemID,
					quantity: quantity
				})
			});
		} catch (error) {
			setErrors({ ...errors, update: (error as Error).message });
		}
	};

	const getItemTotal = (item: CartItem) => item.format.price * item.quantity;
	const getTotal = () =>
		items.length
			? items
					.map((item) => item.quantity * item.format.price)
					.reduce(
						(currentTotal, itemTotal) => currentTotal + itemTotal
					)
			: 0;

	return {
		items,
		getItems,
		updateItemQuantity,
		getItemTotal,
		getTotal,
		errors
	};
}
