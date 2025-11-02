import { useParams } from 'react-router-dom';
import { SubmitButton } from '../components/buttons';
import Card from '../components/Card';
import { H1, H2 } from '../components/headings';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/use-fetch';
import {
	Error,
	Input,
	Label,
	Select,
	Success
} from '../components/form-elements';
import FormGrid, { InputCell } from '../components/FormGrid';
import type { Formats, Photo } from '../types/app';
import { useForm, type SubmitHandler } from 'react-hook-form';
import AppLayout from '../layouts/AppLayout';

type Inputs = {
	format_id: number;
	quantity: number;
};

export default function Purchase() {
	const photo_id = useParams().photo_id;

	const [photo, setPhoto] = useState<Photo>();
	const [formats, setFormats] = useState<Formats>();
	const [pageErrors, setPageErrors] = useState<string[]>([]);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Inputs>();

	const [messages, setMessages] = useState<{
		success: string;
		error: string;
	}>({ success: '', error: '' });

	const send = useFetch();

	useEffect(() => {
		try {
			send(
				import.meta.env.VITE_API_URL +
					`app/images.php?photo_id=${photo_id}`,
				{
					method: 'GET'
				}
			).then((data) => setPhoto(data.photo));
		} catch (error) {
			setPageErrors([...pageErrors, (error as Error).message]);
		}
	}, []);

	useEffect(() => {
		try {
			send(import.meta.env.VITE_API_URL + 'app/formats.php', {
				method: 'GET'
			}).then((data) => setFormats(data.formats));
		} catch (error) {
			setPageErrors([...pageErrors, (error as Error).message]);
		}
	}, []);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setMessages({ success: '', error: '' });

		const formData = new FormData();

		formData.append('photo_id', photo_id + '');
		formData.append('format_id', data.format_id + '');
		formData.append('quantity', data.quantity + '');

		try {
			await send(import.meta.env.VITE_API_URL + 'app/cart.php', {
				method: 'POST',
				body: formData
			});

			setMessages({
				success: 'Item(s) successfully added to cart',
				error: ''
			});

			reset();
		} catch (error) {
			setMessages({
				success: '',
				error:
					(error as Error).message ||
					'Failed to update cart. Please try again.'
			});
		}
	};

	return (
		<AppLayout gallery cart>
			<H1>Purchase Photo</H1>
			<Card className='flex items-center justify-center'>
				{pageErrors && <Error>{pageErrors.join('\n')}</Error>}
				<div className='grid md:grid-cols-2 items-center justify-items-center'>
					{photo ? (
						<img
							src={
								import.meta.env.VITE_API_URL +
								'/uploads/optimized/' +
								photo.image_url
							}
							alt={photo.description || 'Photo'}
							id={photo.photo_id + ''}
							className='rounded w-4/5'
						/>
					) : (
						<span>Photo not found</span>
					)}

					<div>
						<H2>Purchase Details</H2>
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormGrid>
								<InputCell>
									<Label htmlFor='format'>
										Select Format:
									</Label>
									<Select
										{...register('format_id', {
											required: 'Please select a format'
										})}
										defaultValue=''
										required
									>
										<option value='' disabled>
											Select a format
										</option>
										{formats &&
											formats.map((format) => (
												<option
													value={format.format_id}
													key={format.name}
												>
													{format.name} - $
													{format.price}
												</option>
											))}
									</Select>
									{errors.format_id && (
										<Error>
											{errors.format_id.message}
										</Error>
									)}
								</InputCell>

								<InputCell>
									<Label htmlFor='quantity'>Quantity:</Label>
									<Input
										{...register('quantity', {
											required: 'Please define quantity',
											min: {
												value: 1,
												message:
													'Quantity must be greater than zero'
											}
										})}
										type='number'
										min='1'
										defaultValue='1'
										required
									/>
									{errors.quantity && (
										<Error>{errors.quantity.message}</Error>
									)}
								</InputCell>

								<InputCell>
									<SubmitButton>Add to Cart</SubmitButton>
									{messages.error ? (
										<Error>{messages.error}</Error>
									) : (
										<Success>{messages.success}</Success>
									)}
								</InputCell>
							</FormGrid>
						</form>
					</div>
				</div>
			</Card>
		</AppLayout>
	);
}
