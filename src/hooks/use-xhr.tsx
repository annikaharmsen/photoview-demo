import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useXHR() {
	const navigate = useNavigate();
	const [progress, setProgress] = useState<number>(0);

	async function xhr(
		url: string,
		formData: FormData,
		method = 'GET'
	): Promise<object> {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			// track upload progress
			xhr.upload.addEventListener('progress', (e) => {
				if (e.lengthComputable) {
					const percentComplete = (e.loaded / e.total) * 100;
					setProgress(percentComplete);
				}
			});

			// handle completion
			xhr.addEventListener('load', () => {
				if (xhr.status === 401) {
					navigate('/login');
					return;
				}

				setTimeout(resetProgress, 3000);

				try {
					const data = JSON.parse(xhr.responseText);

					if (!data.success) {
						reject(new Error(data.error || 'Request failed'));
					} else {
						resolve(data);
					}
				} catch {
					reject(new Error('Failed to parse server response'));
				}
			});

			// handle errors
			xhr.addEventListener('error', () => {
				reject(new Error('Network error occurred'));
			});

			xhr.addEventListener('abort', () => {
				reject(new Error('Upload cancelled'));
			});

			// send request
			resetProgress();
			xhr.open(method, url);
			xhr.withCredentials = true;
			xhr.send(formData);
		});
	}

	const resetProgress = () => {
		setProgress(0);
	};

	return { xhr, progress, resetProgress };
}
