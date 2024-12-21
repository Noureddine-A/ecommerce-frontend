import axios from "axios";
import { Order } from "../../../types/Order.ts";
import { Response } from "../../../types/Response.ts";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function createOrder(order: Order) {
  console.log(order);
  try {
    const request = await apiClient.post(
      "/api/order/create",
      JSON.stringify(order),
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(true, error.response.data.errors, false);
  }

  return null;
}
