import { useEffect, useState } from 'react';
import { SubmitButton } from '../components/buttons';
import Card from '../components/Card';
import {
	Label,
	Select,
	FileInput,
	TextArea,
	Error,
	Success
} from '../components/form-elements';
import FormGrid, { InputCell } from '../components/FormGrid';
import { H1 } from '../components/headings';
import { useForm, type SubmitHandler } from 'react-hook-form';
import useFetch from '../hooks/use-fetch';
import type { Users } from '../types/app';
import Link from '../components/Link';
import AppLayout from '../layouts/AppLayout';
import useXHR from '../hooks/use-xhr';
import { twMerge } from 'tailwind-merge';

type Inputs = {
	user_id: number;
	photos: File[];
	description?: string;
};

export default function Upload() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<Inputs>();
	const [processing, setProcessing] = useState<boolean>(false);

	const [messages, setMessages] = useState<{
		success: string;
		error: string;
	}>({ success: '', error: '' });

	const [users, setUsers] = useState<Users>([]);

	const sendFetch = useFetch();
	const { xhr, progress } = useXHR();

	useEffect(() => {
		sendFetch(import.meta.env.VITE_API_URL + 'app/users.php', {
			method: 'GET'
		}).then((data) => {
			setUsers(data.users || []);
		});
	}, []);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setProcessing(true);
		setMessages({ success: '', error: '' });

		const formData = new FormData();

		formData.append('user_id', data.user_id + '');
		for (const photo of data.photos) formData.append('photos[]', photo);
		if (data.description) formData.append('description', data.description);

		try {
			await xhr(
				import.meta.env.VITE_API_URL + 'app/images.php',
				formData,
				'POST'
			);

			setMessages({
				success: 'Photo(s) uploaded successfully',
				error: ''
			});

			reset();
		} catch (error) {
			setMessages({
				success: '',
				error:
					(error as Error).message ||
					'Failed to upload photos. Please try again.'
			});
		} finally {
			setProcessing(false);
		}
	};

	return (
		<AppLayout>
			<H1>Upload Photos</H1>
			<Card>
				<form id='upload-form' onSubmit={handleSubmit(onSubmit)}>
					<FormGrid>
						<InputCell>
							<Label htmlFor='user_id'>Select User:</Label>
							<Select
								{...register('user_id', {
									required: 'Please select a user'
								})}
								id='user_id'
								defaultValue=''
								required
							>
								<option value='' disabled>
									Select a user
								</option>
								{users &&
									users.map((user) => (
										<option value={user.user_id}>
											{user.name} - ID: {user.user_id}
										</option>
									))}
							</Select>
							{errors.user_id && (
								<Error>{errors.user_id.message}</Error>
							)}
						</InputCell>

						<InputCell>
							<label htmlFor='photos'>Select Photos:</label>
							<FileInput
								{...register('photos', {
									required:
										'Please select at least one photo to upload'
								})}
								id='photos'
								multiple
								accept='image/*'
								required
							/>
							{errors.photos && (
								<Error>{errors.photos.message}</Error>
							)}
						</InputCell>

						<InputCell>
							<label htmlFor='description'>
								Description (optional):
							</label>
							<TextArea
								{...register('description')}
								id='description'
								placeholder='e.g., Portrait session'
							/>
						</InputCell>

						<div className='relative h-fit w-full'>
							<SubmitButton
								disabled={processing}
								className={twMerge(
									'relative w-full z-1',
									processing &&
										'bg-black/30 hover:bg-black/30'
								)}
							>
								{processing ? 'Uploading...' : 'Upload'}
							</SubmitButton>
							{processing && (
								<div
									className='absolute top-0 left-0 h-full rounded-lg bg-blue-500'
									style={{ width: progress + '%' }}
								/>
							)}
						</div>
					</FormGrid>
				</form>

				{messages.error ? (
					<Error>{messages.error}</Error>
				) : (
					messages.success && (
						<Success>
							{messages.success}{' '}
							<Link to='/gallery'>View in gallery.</Link>
						</Success>
					)
				)}
			</Card>
		</AppLayout>
	);
}
