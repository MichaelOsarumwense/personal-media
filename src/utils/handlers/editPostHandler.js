import { useHistory } from 'react-router-dom';
import { getToken } from '../windowsHelper';

const url = process.env.REACT_APP_URL;

export async function SinglePostHandler(postId, setDescription) {
	try {
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
			setDescription(response.description);
		}
	} catch (e) {
		console.log(e);
	}
}
