import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
			return deletePost.text().then((result) => {
				toast.error(result, {
					position: toast.POSITION.TOP_RIGHT,
				});
				return Promise.reject(result);
			});
		} else {
			await handleClose();
			await setSpinnerLoading(false);
			fetchPost();
			// Show a success toast after successful post deletion
			toast.success('Post deleted successfully!', {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	} catch (e) {
		console.log(e);
		// Show an error toast on post deletion failure
		toast.error('Error deleting post. Please try again.', {
			position: toast.POSITION.TOP_RIGHT,
		});
	}
}

export default deletePostHandler;
