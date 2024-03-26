const { getToken } = require('../../utils/windowsHelper');
const axios = require('axios');

const getPost = async (endpoint) => {
  try {
    const response = await axios.get(`${endpoint}/posts`, {
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

    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

const getPostById = async (endpoint, id) => {
  try {
    const response = await axios.get(`${endpoint}/posts/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching post with id ${id}:`, error);
    throw error;
  }
};

const getPostFunction = async (setIsLoading, setLoadedPosts) => {
  try {
    const endpoint = process.env.REACT_APP_URL;
    const posts = await getPost(endpoint);

    const formattedPosts = Object.entries(posts).map(([id, post]) => ({
      id,
      ...post,
    }));

    setLoadedPosts(formattedPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
  } finally {
    setIsLoading(false);
  }
};

module.exports = { getPostFunction, getPost, getPostById };
