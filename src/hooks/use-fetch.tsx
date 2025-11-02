import { useNavigate } from 'react-router-dom';

// helper function to catch server errors; returns data object
export default function useFetch() {
	const navigate = useNavigate();
	async function sendFetch(url: string, options = {}) {
		try {
			const res = await fetch(url, {
				credentials: 'include',
				...options
			});

			// handle unauthenticated code
			if (res.status === 401) navigate('/login');

			const data = await res.json();

			if (!data.success) {
				throw new Error(
					data.error || res.statusText || 'Unknown error occurred.'
				);
			}

			return data;
		} catch (error) {
			console.error('API call failed:', error);
			throw error;
		}
	}

	return sendFetch;
}
