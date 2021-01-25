/**
 * 本地存储
 */
export const getLocal = (name) => {
    let result = localStorage.getItem(name)
    if (!result) {
        return null;
    } else {
        return JSON.parse(result);
    }
};

export const setLocal = (name, value) => {
    localStorage.setItem(name, value);
};
