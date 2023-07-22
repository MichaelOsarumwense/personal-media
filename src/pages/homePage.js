import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePageLayout from '../components/layout/homeLayout';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';
import { getUserHandler } from '../utils/handlers/getUserHandler';

const { CreatePostHandler } = require('../utils/handlers/createPostHandler');

const { getPostFunction } = require('../utils/handlers/getPostHandler.js');

function HomePage() {
	const history = useHistory();
	const location = useLocation();
	const [isLoading, setIsLoading] = useState(true);
	const [loadedPosts, setLoadedPosts] = useState([]);
	const [spinnerLoading, setSpinnerLoading] = useState(false);
	const [userData, setUserData] = useState({});

	let fetchPostHandler = () => getPostFunction(setIsLoading, setLoadedPosts);

	useEffect(() => {
		setIsLoading(true);
		fetchPostHandler();
		getUserHandler(setUserData);

		// Check if there's a success message in the URL query params
		const urlParams = new URLSearchParams(location.search);
		const successMessage = urlParams.get('success');

		if (successMessage) {
			toast.success(successMessage, {
				position: toast.POSITION.TOP_RIGHT,
			});
			// Remove the 'success' query param from the URL to avoid showing the toast multiple times
			history.replace('/');
		}
	}, [history, location]);

	if (isLoading) {
		return <LoaderComponent spinnerLoading={spinnerLoading} />;
	}

	return (
		<div>
			<ToastContainer />
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
		</div>
	);
}

export default HomePage;
