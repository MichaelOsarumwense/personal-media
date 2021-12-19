import { getToken, pageReload } from '../windowsHelper';

let createPostHandler = async (data, setSpinnerLoading) => {
	try {
		setSpinnerLoading(true);
		const createPost = await fetch(`${url}/posts`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
			body: JSON.stringify(data),
		});

		if (!createPost.ok) {
			setSpinnerLoading(false);
			return createPost.text().then((result) => Promise.reject(result));
		} else {
			await pageReload();
			await setSpinnerLoading(false);
		}
	} catch (e) {
		setSpinnerLoading(false);
		console.log(e);
	}
};

export default createPostHandler;
