import Card from '../components/Card';
import { H1 } from '../components/headings';
import { Error, Input, Label, Success } from '../components/form-elements';
import FormGrid, { InputCell } from '../components/FormGrid';
import useFetch from '../hooks/use-fetch';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../components/Link';
import { Button, SubmitButton } from '../components/buttons';
import AppLayout from '../layouts/AppLayout';
import env from '../lib/env';

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

	const send = useFetch();
	const navigate = useNavigate();

	const handleTestLogin = async () => {
		try {
			const formData = new FormData();
			formData.append('email', env.testUser.email);
			formData.append('password', env.testUser.password);

			await send(env.apiUrl + 'app/login.php', {
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

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const formData = new FormData();
		let key: keyof Inputs;
		for (key in data) formData.append(key, data[key]);

		try {
			await send(env.apiUrl + 'app/login.php', {
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
			<Card className='px-16 py-8'>
				<form id='login-form' onSubmit={handleSubmit(onSubmit)}>
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
					</InputCell>
				</form>
				<span className='block w-full text-center text-lg my-4'>
					OR
				</span>
				<Button className='w-full mb-6' onClick={handleTestLogin}>
					Log In as Test User
				</Button>
				{messages.success && (
					<Success className='text-center block'>
						{messages.success}
					</Success>
				)}
				{messages.error && (
					<Error className='text-center block'>
						{messages.error}
					</Error>
				)}
			</Card>
			<span className='mt-4'>
				Don't have an account? <Link to='/register'>Register</Link>{' '}
				here!
			</span>
		</AppLayout>
	);
}
