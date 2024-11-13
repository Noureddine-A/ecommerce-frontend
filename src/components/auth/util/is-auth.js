export function isAdmin() {
  if (localStorage.getItem("admin") === "true") {
    return true;
  }

  return false;
}

export function isAuth() {
  if (localStorage.getItem("auth") === "true") {
    return true;
  }

  return false;
}
