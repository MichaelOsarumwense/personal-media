import { getToken } from '../windowsHelper';

const url = process.env.REACT_APP_URL;

export async function EditPostHandler(postId, setDescription, setSpinnerLoading) {
	try {
		setSpinnerLoading(true);
		const getPost = await fetch(`${url}/posts/${postId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!getPost.ok) {
			return getPost.text().then((result) => Promise.reject(result));
		} else {
			const response = await getPost.json();
			await setDescription(response.description);
			await setSpinnerLoading(false);
		}
	} catch (e) {
		console.log(e);
	}
}
