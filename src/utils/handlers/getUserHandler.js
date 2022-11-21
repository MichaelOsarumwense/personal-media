import { getToken } from '../windowsHelper';
const url = process.env.REACT_APP_URL;

async function userRequest() {
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
		return getUser.json();
	}
}

async function getUserHandler(setUserData) {
	try {
		const users = await userRequest();
		await setUserData(users);
	} catch (e) {
		console.log(e);
	}
}

export { getUserHandler, userRequest };
