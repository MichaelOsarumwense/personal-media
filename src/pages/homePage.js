import { useState, useEffect } from 'react';

import HomePageLayout from '../components/layout/homeLayout';
import { useHistory } from 'react-router-dom';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';

const url = process.env.REACT_APP_URL;
const token = window.localStorage.getItem('access_token');

function HomePage(props) {
	const history = useHistory();
	const [isLoading, setIsLoading] = useState(true);
	const [loadedPosts, setLoadedPosts] = useState([]);
	const [spinnerLoading, setSpinnerLoading] = useState(false);

	let CreatePostHandler = async (data) => {
		try {
			setSpinnerLoading(true);
			const createPost = await fetch(`${url}/posts`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: token,
				},
				body: JSON.stringify(data),
			});

			if (!createPost.ok) {
				setSpinnerLoading(false);
				return createPost.text().then((result) => Promise.reject(result));
			} else {
				setSpinnerLoading(false);
				window.location.reload();
			}
		} catch (e) {
			setSpinnerLoading(false);
			console.log(e);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetch(`${url}/posts`, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: token,
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
