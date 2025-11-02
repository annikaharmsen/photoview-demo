import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import { H1 } from '../components/headings';
import { useState, useEffect } from 'react';
import useFetch from '../hooks/use-fetch';
import type { Photo, Photos } from '../types/app';
import Link from '../components/Link';
import AppLayout from '../layouts/AppLayout';

export default function Gallery() {
	const [photos, setPhotos] = useState<Photos>([]);
	const [error, setError] = useState<string>('');
	const send = useFetch();

	useEffect(() => {
		try {
			send(import.meta.env.VITE_API_URL + 'app/images.php', {
				method: 'GET'
			}).then((data) => setPhotos(data.photos));
		} catch (error) {
			setError((error as Error).message);
		}
	}, []);

	return (
		<AppLayout cart>
			<H1>Your Gallery</H1>
			<Card className=' flex flex-wrap gap-2 justify-center'>
				{error && <span>{error}</span>}
				{photos && photos.length === 0 ? (
					<span>
						No photos found.{' '}
						<Link to='/upload'>Upload images here</Link> to resume
						the demo.
					</span>
				) : (
					photos.map((photo) => <PhotoComponent photo={photo} />)
				)}
			</Card>
		</AppLayout>
	);
}

const PhotoComponent = ({ photo }: { photo: Photo }) => {
	const navigate = useNavigate();

	return (
		<img
			src={
				import.meta.env.VITE_API_URL +
				'/uploads/optimized/' +
				photo.image_url
			}
			alt={photo.description || 'Photo'}
			id={photo.photo_id + ''}
			onClick={() => navigate(`/purchase/${photo.photo_id}`)}
			className='rounded w-50'
		/>
	);
};
