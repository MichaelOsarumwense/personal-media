import { useState, useEffect } from 'react';

import HomePageLayout from '../components/layout/homeLayout';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';
import { getUserHandler } from '../utils/handlers/getUserHandler';

const { CreatePostHandler } = require('../utils/handlers/createPostHandler');

const { getPostFunction } = require('../utils/handlers/getPostHandler.js');

// import { useToasts } from 'react-toast-notifications';

function HomePage() {
	const [isLoading, setIsLoading] = useState(true);
	const [loadedPosts, setLoadedPosts] = useState([]);
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const [userData, setUserData] = useState({});

	// const { addToast } = useToasts();

	let fetchPostHandler = () => getPostFunction(setIsLoading, setLoadedPosts);

	useEffect(() => {
		setIsLoading(true);
		fetchPostHandler();
		getUserHandler(setUserData);
	}, []);

	if (isLoading) {
		return <LoaderComponent spinnerLoading={spinnerLoading} />;
	}

	return (
		<HomePageLayout>
			<LoaderComponent spinnerLoading={spinnerLoading} />
			<UserInfoLeftColumn userData={userData} />
			<Posts
				setSpinnerLoading={setSpinnerLoading}
				fetchPostHandler={fetchPostHandler}
				createPost={CreatePostHandler}
			>
				<PostLists
					name={userData.name}
					getPostFunction={fetchPostHandler}
					posts={loadedPosts}
				/>
			</Posts>
			<UserInfoRightColumn userData={userData} />
		</HomePageLayout>
	);
}

export default HomePage;
