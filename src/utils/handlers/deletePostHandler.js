const { getToken } = require('../windowsHelper');

const url = process.env.REACT_APP_URL;

async function deletePostHandler(id, setSpinnerLoading, handleClose, fetchPost) {
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
			await handleClose();
			await setSpinnerLoading(false);
			fetchPost();
		}
	} catch (e) {
		console.log(e);
	}
}

export default deletePostHandler;
