import { useState, useEffect } from 'react';
import HomePageLayout from '../components/layout/homeLayout';
import LoaderComponent from '../components/loader/loader';
import Posts from '../components/post/post';
import PostLists from '../components/post/postLists';
import { UserInfoLeftColumn, UserInfoRightColumn } from '../components/userInfo/userInfo';
import { getUserHandler } from '../utils/handlers/getUserHandler';
import { getPostFunction } from '../utils/handlers/getPostHandler.js';

// Ensure CreatePostHandler is defined elsewhere
const { CreatePostHandler } = require('../utils/handlers/createPostHandler');

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [spinnerLoading, setSpinnerLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const fetchPostHandler = async () => await getPostFunction(setIsLoading, setLoadedPosts);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetchPostHandler();
      await getUserHandler(setUserData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <HomePageLayout>
      {isLoading && <LoaderComponent spinnerLoading={spinnerLoading} />}
      <UserInfoLeftColumn userData={userData} />
      <Posts
        setSpinnerLoading={setSpinnerLoading}
        fetchPostHandler={fetchPostHandler}
        createPost={CreatePostHandler} // Ensure CreatePostHandler is defined and imported
      >
        <PostLists name={userData.name} getPostFunction={fetchPostHandler} posts={loadedPosts} />
      </Posts>
      <UserInfoRightColumn userData={userData} />
    </HomePageLayout>
  );
}

export default HomePage;
