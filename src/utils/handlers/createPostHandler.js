import { clearText, getToken } from '../windowsHelper';

const url = process.env.REACT_APP_URL;
const postTextId = 'postText';

let CreatePostHandler = async (data, setSpinnerLoading, fetchPostHandler) => {
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
			fetchPostHandler();
			clearText(postTextId);
			await setSpinnerLoading(false);

			// await addToast('Saved Successfully', { appearance: 'success', autoDismiss: true });
		}
	} catch (e) {
		setSpinnerLoading(false);
		console.log(e);
	}
};

export default CreatePostHandler;
