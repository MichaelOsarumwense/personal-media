const axios = require('axios');
const { getToken } = require('../windowsHelper');

const updatePost = async (url, body, postId, setSpinnerLoading) => {
  setSpinnerLoading(true);
  const response = await axios.request({
    method: 'PATCH',
    baseURL: url,
    url: `/posts/${postId}`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    data: body,
  });

  if (response.status !== 200) {
    setSpinnerLoading(false);
    return Promise.reject(response);
  } else {
    const object = await response;
    setSpinnerLoading(false);
    return object;
  }
};

module.exports = {
  updatePost,
};
