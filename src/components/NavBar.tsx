import { CartButton, GalleryButton } from './app-buttons';

export interface NavBarProps {
	gallery?: boolean;
	cart?: boolean;
}

export default function NavBar({ gallery = false, cart = false }: NavBarProps) {
	return (
		<div className='sticky md:top-0'>
			{gallery && <GalleryButton />}
			{cart && <CartButton />}
		</div>
	);
}
