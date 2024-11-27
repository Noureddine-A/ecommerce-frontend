import axios from "axios";
import { Product } from "../../../types/Product.ts";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function getLatestCollection(): Promise<Product[]> {
  const response = await apiClient.get(BASE_URL + "/api/product/latest", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const latestCollection: Product[] = response.data.map((product) => {
    return new Product(
      product["product"].id,
      product["product"].name,
      product["product"].price,
      product["product"].description,
      product["product"].category_id,
      product["product"].subcategory_name,
      product["product"].sizeList,
      product["product"].images
    );
  });

  return latestCollection;
}
