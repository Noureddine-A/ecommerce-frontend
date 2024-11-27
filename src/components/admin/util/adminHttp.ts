import axios from "axios";
import { Product } from "../../../types/Product.ts";
import { Response } from "../../../types/Response.ts";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function addProduct(product: Product) {
  try {
    await apiClient.post(
      BASE_URL + "/api/admin/add-product",
      JSON.stringify(product),
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return new Response(false, "Success", true);
  } catch (error) {
    console.log(error);
    if (error.status === 403) {
      return new Response(true, error.response.data.message, false);
    }
    return new Response(true, error.response.data.errors, false);
  }
}
