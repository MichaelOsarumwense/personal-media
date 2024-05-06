const { getToken, pageReload } = require('../windowsHelper');
const url = process.env.REACT_APP_URL;

const refreshPage = async () => {
  setTimeout(() => {
    pageReload();
  }, 750);
};

async function deleteAvatar(defaultAvatar, handleClose, setSpinnerLoading) {
  try {
    setSpinnerLoading(true);
    const getUser = await fetch(`${url}/users/me/avatar`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'image/png',
        Authorization: getToken(),
      },
    });

    if (!getUser.ok) {
      setSpinnerLoading(false);
      return getUser.text().then((result) => Promise.reject(result));
    } else {
      await setSpinnerLoading(false);
      await defaultAvatar();
      await handleClose();
      await refreshPage();
    }
  } catch (e) {
    setSpinnerLoading(false);
    console.log(e);
  }
}
export default deleteAvatar;
