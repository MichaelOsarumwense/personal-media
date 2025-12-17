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
	if (typeof window === 'undefined' || typeof document === 'undefined') return;
	const pic = document.getElementById('profileImg');
	if (!pic) return;
	let asset;
	try {
		// Lazy-resolve the asset only in a browser-like environment
		// eslint-disable-next-line global-require
		asset = require('../components/layout/images/default-avatar.svg');
	} catch (e) {
		asset = null;
	}
	const url = asset && (asset.default || asset);
	if (url) pic.src = url;
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

module.exports = {
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
