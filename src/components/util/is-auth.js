export function isAuth() {
    return localStorage.getItem("auth");
}

export function isAdmin() {
    return localStorage.getItem("admin");
}