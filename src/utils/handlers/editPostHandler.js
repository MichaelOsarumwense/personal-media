const { getPostById } = require('./getPostHandler');

const url = process.env.REACT_APP_URL;

export async function EditPostHandler(postId, setDescription, setSpinnerLoading) {
	try {
		setSpinnerLoading(true);

		const posts = await getPostById(url, postId);

		await setDescription(posts.data.description);
		await setSpinnerLoading(false);
	} catch (e) {
		setSpinnerLoading(true);
		console.log(e);
	}
}
