import { getToken, pageReload } from '../windowsHelper';

const url = process.env.REACT_APP_URL;

async function deletePostHandler(id, setSpinnerLoading, handleClose) {
	try {
		setSpinnerLoading(true);
		const deletePost = await fetch(`${url}/posts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!deletePost.ok) {
			setSpinnerLoading(false);
			return deletePost.text().then((result) => Promise.reject(result));
		} else {
			handleClose();
			setSpinnerLoading(false);
			pageReload();
		}
	} catch (e) {
		console.log(e);
	}
}

export default deletePostHandler;
