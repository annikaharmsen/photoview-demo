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
import useHTTP from '../hooks/use-http';
import type { Users } from '../types/app';
import Link from '../components/Link';
import AppLayout from '../layouts/AppLayout';

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

	const [messages, setMessages] = useState<{
		success: string;
		error: string;
	}>({ success: '', error: '' });

	const [users, setUsers] = useState<Users>([]);

	const send = useHTTP();

	useEffect(() => {
		send(import.meta.env.VITE_API_URL + 'app/users.php', {
			method: 'GET'
		}).then((data) => {
			setUsers(data.users || []);
		});
	}, []);

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		setMessages({ success: '', error: '' });

		const formData = new FormData();

		formData.append('user_id', data.user_id + '');
		for (const photo of data.photos) formData.append('photos[]', photo);
		if (data.description) formData.append('description', data.description);

		try {
			await send(import.meta.env.VITE_API_URL + 'app/images.php', {
				method: 'POST',
				body: formData
			});

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

						<SubmitButton>Upload</SubmitButton>
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
