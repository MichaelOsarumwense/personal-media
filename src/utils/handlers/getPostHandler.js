import { getToken } from '../../utils/windowsHelper';
const url = process.env.REACT_APP_URL;
let posts;

const getPost = async () => {
	const response = await fetch(`${url}/posts?sortBy=createdAt&OrderBy=desc`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
	});

	const data = await response.json();
	return data;
};

async function getPostFunction(setIsLoading, setLoadedPosts) {
	const data = await getPost();
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
}

export { getPostFunction, getPost };
