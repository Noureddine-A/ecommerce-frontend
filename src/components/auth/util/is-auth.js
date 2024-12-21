export function isAdmin() {
  if (sessionStorage.getItem("admin") === "true") {
    return true;
  }

  return false;
}

export function isAuth() {
  if (sessionStorage.getItem("auth") === "true") {
    return true;
  }

  return false;
}
