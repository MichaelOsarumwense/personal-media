import { getToken, pageReload } from '../windowsHelper';

const url = process.env.REACT_APP_URL;

export async function EditPostHandler(id, setSpinnerLoading, handleClose) {
	try {
		setSpinnerLoading(true);
		const editPost = await fetch(`${url}/posts/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!editPost.ok) {
			setSpinnerLoading(false);
			return editPost.text().then((result) => Promise.reject(result));
		} else {
			handleClose();
			setSpinnerLoading(false);
			pageReload();
		}
	} catch (e) {
		console.log(e);
	}
}

export async function SinglePostHandler(id) {
	try {
		const getPost = await fetch(`${url}/posts/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!getPost.ok) {
			return getPost.text().then((result) => Promise.reject(result));
		} else {
			getPost.json();
		}
	} catch (e) {
		console.log(e);
	}
}
