import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
});

export async function addCategory(category) {
  try {
    const response = await apiClient.post(
      "/api/admin/add-category",
      JSON.stringify({ categoryName: category }),
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
    return error;
  }
}

export async function getCategories() {
  try {
    const response = await apiClient.get(
      BASE_URL + "/api/admin/get-categories",
      {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.categories !== undefined) {
      return { success: true, categories: response.data.categories };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    return error;
  }
}
