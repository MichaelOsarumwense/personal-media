const { getToken } = require('../windowsHelper');
const url = process.env.REACT_APP_URL;

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
			setSpinnerLoading(false);
			defaultAvatar();
			handleClose();
		}
	} catch (e) {
		setSpinnerLoading(false);
		console.log(e);
	}
}
export default deleteAvatar;
