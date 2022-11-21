import { clearText, getToken } from '../windowsHelper';

const url = process.env.REACT_APP_URL;
const postTextId = 'postText';

const createPost = async (data) => {
	const response = await fetch(`${url}/posts`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		return response.text().then((result) => Promise.reject(result));
	} else {
		const object = await response.json();
		return object;
	}
};

let CreatePostHandler = async (data, setSpinnerLoading, fetchPostHandler) => {
	try {
		setSpinnerLoading(true);

		await createPost(data);

		await fetchPostHandler();
		clearText(postTextId);
		await setSpinnerLoading(false);
	} catch (e) {
		setSpinnerLoading(false);
		console.log(e);
	}
};

export { CreatePostHandler, createPost };
