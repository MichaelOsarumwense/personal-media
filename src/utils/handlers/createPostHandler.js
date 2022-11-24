const { default: axios } = require('axios');
const { clearText, getToken } = require('../windowsHelper');

const postTextId = 'postText';

const createPost = async (body, url) => {
	const response = await axios.request({
		method: 'POST',
		baseURL: url,
		url: '/posts',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
		data: body,
	});

	if (!response.statusText) {
		return Promise.reject(response);
	} else {
		const object = response;
		return object;
	}
};

let CreatePostHandler = async (data, setSpinnerLoading, fetchPostHandler) => {
	const url = process.env.REACT_APP_URL;
	try {
		setSpinnerLoading(true);

		await createPost(data, url);

		await fetchPostHandler();
		clearText(postTextId);
		await setSpinnerLoading(false);
	} catch (e) {
		setSpinnerLoading(false);
		console.log(e);
	}
};

module.exports = { CreatePostHandler, createPost };
