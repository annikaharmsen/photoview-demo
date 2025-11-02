import Card, { CardSection } from '../components/Card';
import { H1, H2 } from '../components/headings';
import { useEffect, useState } from 'react';
import useCart from '../hooks/use-cart';
import { CartItemImg, CartItemInfo } from '../components/cart-item';
import AddressForm, {
	type Inputs as AddressInputs
} from '../components/AddressForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type Appearance } from '@stripe/stripe-js';
import StripePayment from '../components/StripePaymentForm';
import type { SubmitHandler } from 'react-hook-form';
import { Error, Success } from '../components/form-elements';
import useFetch from '../hooks/use-fetch';
import Link from '../components/Link';
import AppLayout from '../layouts/AppLayout';

const stripePromise = loadStripe(
	'pk_test_51RFyJ6Lu5AWoCdyfkdsr1NP8cn7toL8b6WceOniIw1bdbAamksCoCdEt870Pk7kyJLeJBksECfpEblkJbKvkKPPI00uGFUzMHI'
);

const appearance: Appearance = {
	theme: 'flat',
	variables: {
		colorPrimary: '#0062d1'
	}
};

export default function Checkout() {
	const send = useFetch();
	const cart = useCart();
	const [clientSecret, setClientSecret] = useState<string>();
	const [messages, setMessages] = useState<{
		error?: string;
		success?: string;
	}>({});

	useEffect(() => cart.getItems(), []);

	const onSubmitAddress: SubmitHandler<AddressInputs> = (addressData) => {
		try {
			send(import.meta.env.VITE_API_URL + 'app/order.php', {
				method: 'POST',
				body: JSON.stringify({
					shipping_address: addressData,
					cart_items: cart.items
				})
			}).then((data: { client_secret: string }) =>
				setClientSecret(data.client_secret)
			);
		} catch (error) {
			setMessages({ error: (error as Error).message });
		}
	};

	return (
		<AppLayout gallery cart>
			<H1>Checkout</H1>
			<Card className=' flex flex-col gap-4'>
				{cart.items.length ? (
					<>
						<div>
							<H2>Order Summary</H2>
							<CardSection
								variant='outline'
								className='flex flex-col gap-4'
							>
								{cart.items.map((item) => (
									<CardSection className='lg:min-w-150 flex flex-col lg:flex-row items-center justify-between'>
										<CartItemImg
											item={item}
											className='max-w-60 lg:max-w-40'
										/>
										<CartItemInfo
											item={item}
											className='mr-4'
										/>
									</CardSection>
								))}
								<p>Total: ${cart.getTotal()}</p>
							</CardSection>
						</div>

						<div>
							<H2>Order Details</H2>
							<CardSection variant='outline'>
								{!clientSecret ? (
									<AddressForm onSubmit={onSubmitAddress} />
								) : (
									<Elements
										options={{
											clientSecret,
											appearance
										}}
										stripe={stripePromise}
									>
										<StripePayment />
									</Elements>
								)}
								{messages.error && (
									<Error>{messages.error}</Error>
								)}
								{messages.success && (
									<Success>{messages.success}</Success>
								)}
							</CardSection>
						</div>
					</>
				) : (
					<p>
						Your cart is empty.{' '}
						<Link to='/gallery'>Return to gallery</Link> to resume
						shopping.
					</p>
				)}
			</Card>
		</AppLayout>
	);
}
