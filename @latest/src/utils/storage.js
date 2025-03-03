export function getLocalStorageItem(key, defaultValue = "") {
    return localStorage.getItem(key) || defaultValue;
};

export function setLocalStorageItem(key, value) {
    localStorage.setItem(key, value);
};

export function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
};