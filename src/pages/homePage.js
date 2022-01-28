import { useState, useEffect } from 'react';

import HomePageLayout from '../components/layout/homeLayout';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';
import { getPostFunction } from '../utils/handlers/getPostHandler';
import { getToken, pageReload } from '../utils/windowsHelper';

// import { useToasts } from 'react-toast-notifications';

const url = process.env.REACT_APP_URL;

function HomePage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedPosts, setLoadedPosts] = useState([]);
	const [spinnerLoading, setSpinnerLoading] = useState(false);

	// const { addToast } = useToasts();

	useEffect(() => {
		setIsLoading(true);

		getPostFunction(setIsLoading, setLoadedPosts);
	}, []);

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
				await pageReload();

				// await addToast('Saved Successfully', { appearance: 'success', autoDismiss: true });
			}
		} catch (e) {
			setSpinnerLoading(false);
			console.log(e);
		}
	};

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
