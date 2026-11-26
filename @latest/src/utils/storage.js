export function getLocalStorageItem(key, defaultValue = "") {
    return localStorage.getItem(key) || defaultValue;
};

export function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
};

export function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
};

export function setLocalKeys(key, value) {
    localStorage.setItem(key, value);
};

export function setCookie(key, value) {
    document.cookie = `${key}=${value}; path=/;`;
}

export function getCookie() {
    const cookies = document.cookie.split(';');
    return cookies;
}

export function deleteCookie(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}