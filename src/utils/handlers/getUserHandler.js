import { getToken } from '../windowsHelper';
const url = process.env.REACT_APP_URL;

async function getUserHandler(setUserData) {
	try {
		const getUser = await fetch(`${url}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: getToken(),
			},
		});

		if (!getUser.ok) {
			return getUser.text().then((result) => Promise.reject(result));
		} else {
			const users = await getUser.json();
			await setUserData(users);
		}
	} catch (e) {
		console.log(e);
	}
}

export default getUserHandler;
