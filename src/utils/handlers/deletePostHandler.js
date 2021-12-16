import { getToken, pageReload } from '../windowsHelper';

const url = process.env.REACT_APP_URL;

async function deletePostHandler(id, setSpinnerLoading) {
	try {
		setSpinnerLoading(true);
		const deleteUser = await fetch(`${url}/posts/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!deleteUser.ok) {
			setSpinnerLoading(false);
			return deleteUser.text().then((result) => Promise.reject(result));
		} else {
			setSpinnerLoading(false);
			pageReload();
		}
	} catch (e) {
		console.log(e);
	}
}

export default deletePostHandler;
