import { type StripePaymentElementOptions } from '@stripe/stripe-js';
import { useState, type FormEventHandler } from 'react';
import {
	PaymentElement,
	useElements,
	useStripe
} from '@stripe/react-stripe-js';
import { SubmitButton } from './buttons';
import { Error } from './form-elements';

export default function StripePaymentForm() {
	const stripe = useStripe();
	const elements = useElements();
	const completePageURL = import.meta.env.VITE_WEB_URL + 'complete';

	const [error, setError] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit: FormEventHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: completePageURL
			}
		});

		if (error.type === 'card_error' || error.type === 'validation_error') {
			setError(error.message || '');
		} else {
			setError('An unexpected error occurred.');
		}

		setIsLoading(false);
	};

	const options: StripePaymentElementOptions = {
		layout: 'accordion'
	};

	return (
		<form onSubmit={handleSubmit}>
			<PaymentElement options={options} className='mb-4' />
			<SubmitButton
				disabled={isLoading || !stripe || !elements}
				className='block w-full'
			>
				{isLoading ? 'Loading...' : 'Pay now'}
			</SubmitButton>
			{error && <Error>{error}</Error>}
		</form>
	);
}
