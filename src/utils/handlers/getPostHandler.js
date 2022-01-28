import { getToken } from '../../utils/windowsHelper';
const url = process.env.REACT_APP_URL;
let posts;

async function getPostFunction(setIsLoading, setLoadedPosts) {
	const response = await fetch(`${url}/posts?sortBy=createdAt&OrderBy=desc`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: getToken(),
		},
	});

	const data = await response.json();

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

export { getPostFunction, posts };
