import { Route, Routes } from 'react-router-dom';
import './App.css';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Upload from './pages/Upload';
import Purchase from './pages/Purchase';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Complete from './pages/Complete';
import NotFound from './pages/NotFound';

function App() {
	return (
		<Routes>
			<Route path='/' Component={Welcome} />
			<Route path='/register' Component={Register} />
			<Route path='/login' Component={Login} />
			<Route path='/gallery' Component={Gallery} />
			<Route path='/purchase/:photo_id' Component={Purchase} />
			<Route path='/cart' Component={Cart} />
			<Route path='/checkout' Component={Checkout} />
			<Route path='/complete' Component={Complete} />
			<Route path='/upload' Component={Upload} />
			<Route path='*' Component={NotFound} />
		</Routes>
	);
}

export default App;
