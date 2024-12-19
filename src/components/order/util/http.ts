import axios from "axios";
import { Order } from "../../../types/Order.ts";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function createOrder(order: Order) {
  const response = await apiClient.post(
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
}
