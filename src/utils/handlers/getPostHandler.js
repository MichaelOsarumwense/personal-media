const { getToken } = require('../../utils/windowsHelper');
let posts;

const axios = require('axios');

const getPost = async (endpoint) => {
	const response = await axios.request({
		method: 'GET',
		baseURL: endpoint,
		url: '/posts',
		params: {
			sortBy: 'createdAt',
			OrderBy: 'desc',
		},
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
	});
	if (!response.statusText) {
		return Promise.reject(response);
	} else {
		const object = await response;
		return object;
	}
};

const getPostById = async (endpoint, id) => {
	const response = await axios.request({
		method: 'GET',
		baseURL: endpoint,
		url: `/posts/${id}`,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
	});
	if (!response.statusText) {
		return Promise.reject(response);
	} else {
		const object = await response;
		return object;
	}
};

const getPostFunction = async (setIsLoading, setLoadedPosts) => {
	const url = process.env.REACT_APP_URL;
	const dataObject = await getPost(url);
	const data = await dataObject.data;
	posts = [];

	for (const key in data) {
		const post = {
			id: key,
			...data[key],
		};

		posts.push(post);
	}

	setIsLoading(false);
	setLoadedPosts(posts);
};

module.exports = { getPostFunction, getPost, getPostById };
