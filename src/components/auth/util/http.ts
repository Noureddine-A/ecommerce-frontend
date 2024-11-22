import axios from "axios";
import { User } from "../../../types/User.ts";
import { Response } from "../../../types/Response.ts";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function authenticate(user: User, route: string) {
  await apiClient.get("/sanctum/csrf-cookie", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (route === "signup") {
    return await signup(user);
  } else if (route === "login") {
    return await login(user);
  }
}

export async function signup(user: User): Promise<Response | Error> {
  let response: Response;
  try {
    const res = await apiClient.post("/api/user/signup", JSON.stringify(user), {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return new Response(false, res.data.message, false);
  } catch (error) {
    response = new Response(true, error.response.data.errors, false);
    return response;
  }
}

export async function login(user: User): Promise<Response> {
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

    return new Response(false, response.data.message, response.data.admin);
  } catch (error) {
    return new Response(true, error.response.data.errors, false);
  }
}

export async function logout(): Promise<boolean> {
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
