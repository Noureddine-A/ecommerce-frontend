import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function signUpUser(user) {
  try {
    const response = await apiClient.post(
      "/api/user/signup",
      JSON.stringify(user),
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response;
  } catch (error) {
    return error.response.data.errors;
  }
}

export async function login(user) {
  try {
    const response = await apiClient.post(
      "/api/user/login",
      JSON.stringify(user),
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function authenticate(user, route) {
  let res;
  await apiClient.get("/sanctum/csrf-cookie", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (route === "signup") {
    res = await signUpUser(user);
  } else if (route === "login") {
    res = await login(user);
  }

  return res;
}

export async function logout() {
  try {
    await apiClient.post("/api/user/logout", {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (error) {
    return false;
  }
}