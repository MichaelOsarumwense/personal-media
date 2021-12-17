export const pageReload = () => window.location.reload();

export const setToken = (key, value) => window.localStorage.setItem(key, value);

export const getToken = (token = 'access_token') => window.localStorage.getItem(token);

export const deleteToken = (token = 'access_token') => window.localStorage.removeItem(token);
