export function setWindowVariable(path) {
    const parts = path.split('.');
    let current = window;
    for (let i = 0; i < parts.length; i++) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
    current.value = path.toString();
}