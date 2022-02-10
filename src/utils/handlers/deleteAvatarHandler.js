import { getToken } from '../windowsHelper';
const url = process.env.REACT_APP_URL;

async function deleteAvatar(defaultAvatar, handleClose) {
	try {
		const getUser = await fetch(`${url}/users/me/avatar`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'image/png',
				Authorization: getToken(),
			},
		});

		if (!getUser.ok) {
			return getUser.text().then((result) => Promise.reject(result));
		} else {
			defaultAvatar();
			handleClose();
		}
	} catch (e) {
		console.log(e);
	}
}
export default deleteAvatar;
