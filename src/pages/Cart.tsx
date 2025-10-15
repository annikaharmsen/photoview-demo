import { useEffect } from 'react';
import { Button } from '../components/buttons';
import Card, { CardSection } from '../components/Card';
import { H1, H2 } from '../components/headings';
import Link from '../components/Link';
import { useNavigate } from 'react-router-dom';
import useCart from '../hooks/use-cart';
import { CartItemImg, CartItemInfo } from '../components/cart-item';
import AppLayout from '../layouts/AppLayout';

export default function Cart() {
	const cart = useCart();
	const navigate = useNavigate();

	useEffect(() => cart.getItems(), []);

	return (
		<AppLayout gallery>
			<H1>Shopping Cart</H1>
			<Card>
				<CardSection
					variant='outline'
					className='flex flex-col justify-center gap-4 mb-4'
				>
					{cart.items ? (
						cart.items.map((item) => (
							<CardSection className='grid md:grid-cols-[32%_auto] gap-4'>
								<CartItemImg item={item} className='rounded' />
								<CartItemInfo
									item={item}
									headingComponent={H2}
									showDescription
									onQtyChange={(value) => {
										cart.updateItemQuantity(
											item.cart_item_id,
											value
										);
										cart.getItems();
									}}
								/>
							</CardSection>
						))
					) : (
						<p>
							No items in cart.{' '}
							<Link to='/gallery'>
								Return to gallery by clicking here.
							</Link>
						</p>
					)}
				</CardSection>
				<div className='w-full flex flex-col gap-4'>
					<span className='font-bold text-right'>
						Total: ${cart.getTotal().toFixed(2)}
					</span>
					<Button onClick={() => navigate('/checkout')}>
						Checkout
					</Button>
				</div>
			</Card>
		</AppLayout>
	);
}
