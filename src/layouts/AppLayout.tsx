import type { PropsWithChildren } from 'react';
import NavBar, { type NavBarProps } from '../components/NavBar';
import CenteredLayout from './CenteredLayout';
import DemoLayout from './DemoLayout';

export default function AppLayout({
	children,
	...navbarProps
}: PropsWithChildren<NavBarProps>) {
	return (
		<DemoLayout>
			<NavBar {...navbarProps} />
			<CenteredLayout>{children}</CenteredLayout>
		</DemoLayout>
	);
}
