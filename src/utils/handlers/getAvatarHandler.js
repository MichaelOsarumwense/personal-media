const { getToken } = require('../windowsHelper');
const url = process.env.REACT_APP_URL;

async function getAvatar(setAvatar) {
  try {
    const getUser = await fetch(`${url}/users/me/avatar`, {
      method: 'GET',
      headers: {
        'Content-Type': 'image/png',
        Authorization: getToken(),
      },
    });

    if (!getUser.ok) {
      console.log(getUser);
    } else {
      const usersAvatar = await getUser.blob();
      const avatarUrl = await URL.createObjectURL(usersAvatar);
      await setAvatar(avatarUrl);
      console.log(avatarUrl);
    }
  } catch (e) {
    console.log(e);
  }
}
export default getAvatar;
