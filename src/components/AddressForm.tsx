import { useForm, type SubmitHandler } from 'react-hook-form';
import { Error, Input, Label } from './form-elements';
import FormGrid, { InputCell } from './FormGrid';
import { H3 } from './headings';
import { SubmitButton } from './buttons';

export type Inputs = {
	full_name: string;
	address: string;
	city: string;
	state: string;
	zip: string;
};

export default function AddressForm({
	onSubmit
}: {
	onSubmit: SubmitHandler<Inputs>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormGrid className='lg:grid-cols-2'>
				<H3>Shipping Information</H3>

				<InputCell>
					<Label htmlFor='full-name'>Full Name</Label>
					<Input
						{...register('full_name', {
							required: 'Please enter your name'
						})}
						type='text'
						required
					/>
					{errors.full_name && (
						<Error>{errors.full_name.message}</Error>
					)}
				</InputCell>

				<InputCell>
					<Label htmlFor='address'>Address</Label>
					<Input
						{...register('address', {
							required: 'Please enter your street address'
						})}
						type='text'
						required
					/>
					{errors.address && <Error>{errors.address.message}</Error>}
				</InputCell>

				<InputCell>
					<Label htmlFor='city'>City</Label>
					<Input
						{...register('city', {
							required: 'Please enter your city'
						})}
						type='text'
						required
					/>
					{errors.city && <Error>{errors.city.message}</Error>}
				</InputCell>

				<InputCell>
					<Label htmlFor='state'>State</Label>
					<Input
						{...register('state', {
							required: 'Please enter your state'
						})}
						type='text'
						required
					/>
					{errors.city && <Error>{errors.city.message}</Error>}
				</InputCell>

				<InputCell>
					<Label htmlFor='zip'>ZIP Code</Label>
					<Input
						{...register('zip', {
							required: 'Please enter your zip code',
							pattern: {
								value: /\d{5}(?:[-\s]\d{4})?/,
								message: 'Please enter a valid zip code'
							}
						})}
						type='text'
						required
					/>
					{errors.zip && <Error>{errors.zip.message}</Error>}
				</InputCell>
				<SubmitButton className='lg:col-span-2 w-full'>
					Confirm Address
				</SubmitButton>
			</FormGrid>
		</form>
	);
}
