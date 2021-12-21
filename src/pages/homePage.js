import { useState, useEffect } from 'react';

import HomePageLayout from '../components/layout/homeLayout';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';
import { getToken, pageReload } from '../utils/windowsHelper';

// import { useToasts } from 'react-toast-notifications';

const url = process.env.REACT_APP_URL;

function HomePage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedPosts, setLoadedPosts] = useState([]);
	const [spinnerLoading, setSpinnerLoading] = useState(false);

	// const { addToast } = useToasts();

	let CreatePostHandler = async (data) => {
		try {
			setSpinnerLoading(true);
			const createPost = await fetch(`${url}/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: getToken(),
				},
				body: JSON.stringify(data),
			});

			if (!createPost.ok) {
				setSpinnerLoading(false);
				return createPost.text().then((result) => Promise.reject(result));
			} else {
				await setSpinnerLoading(false);
				pageReload();
				// await addToast('Saved Successfully', { appearance: 'success', autoDismiss: true });
			}
		} catch (e) {
			setSpinnerLoading(false);
			console.log(e);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetch(`${url}/posts?sortBy=createdAt&OrderBy=desc`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				const posts = [];

				for (const key in data) {
					const post = {
						id: key,
						...data[key],
					};

					posts.push(post);
				}

				setIsLoading(false);
				setLoadedPosts(posts);
			});
	}, []);

	if (isLoading) {
		return <LoaderComponent spinnerLoading={spinnerLoading} />;
	}

	return (
		<HomePageLayout>
			<LoaderComponent spinnerLoading={spinnerLoading} />
			<UserInfoLeftColumn />
			<Posts createPost={CreatePostHandler}>
				<PostLists posts={loadedPosts} />
			</Posts>
			<UserInfoRightColumn />
		</HomePageLayout>
	);
}

export default HomePage;
