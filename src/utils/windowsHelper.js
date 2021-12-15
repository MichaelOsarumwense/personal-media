export const pageReload = () => window.location.reload();

export const setToken = (key, value) => window.localStorage.setItem(key, value);

export const getToken = () => window.localStorage.getItem('access_token');

export const deleteToken = () => window.localStorage.removeItem('access_token');
