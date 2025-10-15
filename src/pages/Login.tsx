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
	email: string;
	password: string;
};

export default function Login() {
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
		const formData = new FormData();
		let key: keyof Inputs;
		for (key in data) formData.append(key, data[key]);

		try {
			await send(import.meta.env.VITE_API_URL + 'app/login.php', {
				method: 'POST',
				body: formData
			});

			setMessages({
				success: 'Login successful. Proceeding to gallery...',
				error: ''
			});

			setTimeout(() => {
				navigate('/gallery');
			}, 3000);
		} catch {
			setMessages({
				success: '',
				error: 'Login failed. Please try again.'
			});
		}
	};

	return (
		<AppLayout>
			<H1>Login</H1>
			<Card className='px-16 py-12'>
				<form id='register-form' onSubmit={handleSubmit(onSubmit)}>
					<FormGrid>
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
								required
							/>
							{errors.password && (
								<Error>{errors.password.message}</Error>
							)}
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
				Don't have an account? <Link to='/register'>Register</Link>{' '}
				here!
			</span>
		</AppLayout>
	);
}
