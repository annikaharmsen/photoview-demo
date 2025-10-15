import { useNavigate } from 'react-router-dom';
import { Button } from './buttons';
import { LayoutGrid, ShoppingCart } from 'lucide-react';

export const CartButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate('/cart')}
			className='absolute top-4 right-4'
			variant='ghost'
		>
			<ShoppingCart />
		</Button>
	);
};

export const GalleryButton = () => {
	const navigate = useNavigate();
	return (
		<Button
			onClick={() => navigate('/gallery')}
			className='absolute top-4 left-4'
			variant='ghost'
		>
			<LayoutGrid />
		</Button>
	);
};
