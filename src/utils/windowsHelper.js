import defaultImage from '../components/layout/images/01.png';

export const pageReload = () => window.location.reload();

export const setToken = (key, value) => window.localStorage.setItem(key, value);

export const getToken = (token = 'access_token') => window.localStorage.getItem(token);

export const deleteToken = (token = 'access_token') => window.localStorage.removeItem(token);

export const defaultAvatar = () => {
	var pic = document.getElementById('profileImg');
	pic.src = defaultImage;
};

export const changeText = (id, text) => (document.getElementById(id).value = text);

export const clearText = (id) => (document.getElementById(id).value = '');

export const emptyDiv = (id) => (document.getElementById(id).innerHTML = '');

export const populateDiv = (id, text) => (document.getElementById(id).innerHTML = text);

export const hideElement = (id) => (document.getElementById(id).style.display = 'none');

export const formatDate = (value) => {
	const date = value || 'YYYY-MM-DDT00:00:00.000Z';
	const timeOfDay = parseInt(date.substring(11, 13));
	const amPM = timeOfDay >= 12 ? 'pm' : 'am';
	let dates = `${date.substring(11, 16)} ${amPM} (${date.substring(0, 10)})`;
	return dates;
};
