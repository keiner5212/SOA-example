export function saveCookie(key, value) {
    // save a cookie in the browser with 1h expiration
    document.cookie = `${key}=${value};max-age=3600`;
}

export function getCookie(key) {
    // get a cookie from the browser
    const cookie = document.cookie
        .split(';')
        .find((c) => c.trim().startsWith(`${key}=`));
    if (!cookie) return null;
    return cookie.split('=')[1];
}