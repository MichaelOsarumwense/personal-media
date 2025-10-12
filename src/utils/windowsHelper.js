import defaultAvatarAsset from '../components/layout/images/default-avatar.svg';

const pageReload = () => window.location.reload();

const setToken = (key, value) => {
	if (typeof window !== 'undefined') {
		window.localStorage.setItem(key, value);
	} else {
		return process.env.TOKEN;
	}
};

const getToken = (token = 'access_token') => {
	if (typeof window !== 'undefined') {
		return window.localStorage.getItem(token);
	} else {
		return process.env.TOKEN;
	}
};

const deleteToken = (token = 'access_token') => window.localStorage.removeItem(token);

const defaultAvatar = () => {
	var pic = document.getElementById('profileImg');
	pic.src = defaultAvatarAsset;
};

const changeText = (id, text) => (document.getElementById(id).value = text);

const clearText = (id) => (document.getElementById(id).value = '');

const emptyDiv = (id) => (document.getElementById(id).innerHTML = '');

const populateDiv = (id, text) => (document.getElementById(id).innerHTML = text);

const hideElement = (id) => (document.getElementById(id).style.display = 'none');

const generateUserToken = async (url, data) =>
	await fetch(`${url}/users/login`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

export {
	getToken,
	hideElement,
	populateDiv,
	emptyDiv,
	clearText,
	changeText,
	defaultAvatar,
	deleteToken,
	setToken,
	pageReload,
	generateUserToken,
};
