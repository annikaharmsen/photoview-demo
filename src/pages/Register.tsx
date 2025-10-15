import Card from '../components/Card';
import { H1 } from '../components/headings';
import { Error, Input, Label, Success } from '../components/form-elements';
import FormGrid, { InputCell } from '../components/FormGrid';
import useHTTP from '../hooks/use-http';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../components/Link';
import { SubmitButton } from '../components/buttons';
import AppLayout from '../layouts/AppLayout';

type Inputs = {
	name: string;
	email: string;
	password: string;
	confirm_password: string;
};

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<Inputs>();

	const [messages, setMessages] = useState<{
		success: string;
		error: string;
	}>({ success: '', error: '' });

	const send = useHTTP();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (data.confirm_password !== data.password) {
			messages.error = 'Passwords must match';
			return;
		}
		const formData = new FormData();
		let key: keyof Inputs;
		for (key in data) formData.append(key, data[key]);

		try {
			await send(import.meta.env.VITE_API_URL + 'app/register.php', {
				method: 'POST',
				body: formData
			});

			setMessages({
				success:
					'Account registration successful. Proceeding to gallery...',
				error: ''
			});

			setTimeout(() => {
				navigate('/gallery');
			}, 1000);
		} catch (error) {
			setMessages({
				success: '',
				error: (error as Error).message
			});
		}
	};

	return (
		<AppLayout>
			<H1 className='pb-8'>Register</H1>
			<Card className='px-16 py-12'>
				<form id='register-form' onSubmit={handleSubmit(onSubmit)}>
					<FormGrid>
						<InputCell>
							<Label htmlFor='name'>Name: </Label>
							<Input
								{...register('name', {
									required: 'Name is required'
								})}
								type='text'
								id='name'
								autoComplete='name'
								required
							/>
							{errors.name && (
								<Error>{errors.name.message}</Error>
							)}
						</InputCell>

						<InputCell>
							<Label htmlFor='email'>Email: </Label>
							<Input
								{...register('email', {
									required: 'Email is required'
								})}
								type='email'
								id='email'
								required
							/>
							{errors.email && (
								<Error>{errors.email.message}</Error>
							)}
						</InputCell>

						<InputCell>
							<Label htmlFor='password'>Password: </Label>
							<Input
								{...register('password', {
									required: 'Password is required'
								})}
								type='password'
								id='password'
								autoComplete='new-password'
								required
							/>
							{errors.password && (
								<Error>{errors.password.message}</Error>
							)}
						</InputCell>

						<InputCell>
							<Label htmlFor='confirm_password'>
								Confirm Password:{' '}
							</Label>
							<Input
								{...register('confirm_password', {
									required: 'Please reenter your password'
								})}
								type='password'
								id='confirm-password'
								autoComplete='new-password'
								required
							/>
						</InputCell>
					</FormGrid>

					<InputCell>
						<SubmitButton />
						{messages.success && (
							<Success>{messages.success}</Success>
						)}
						{messages.error && <Error>{messages.error}</Error>}
					</InputCell>
				</form>
			</Card>
			<span className='mt-4'>
				Already have an account? <Link to='/login'>Log in</Link>{' '}
				instead!
			</span>
		</AppLayout>
	);
}
