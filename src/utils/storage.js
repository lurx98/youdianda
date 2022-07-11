

export const setItem = (key, val) => {
    if (typeof val === 'object') {
        localStorage.setItem(key, JSON.stringify(val))
    } else {
        localStorage.setItem(key, val)
    }
}
export const getItem = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return localStorage.getItem(key)
    }
}

export const removeItem = (key) => {
    localStorage.removeItem(key)
}
