import React, { useEffect } from "react";
import { Form, useLoaderData } from "react-router-dom";
import { getCategories } from "./util/adminHttp";

const AddProduct = () => {
  const loaderData = useLoaderData();

  return (
    <>
      <Form
        method="post"
        action="/admin/add-product"
        className="w-full h-full px-[2rem] py-[2rem]"
      >
        <div className="h-4/5 w-4/5">
          {loaderData.success === true ? (
            <>
              <h1 className="text-3xl mb-[2rem]">Add Product</h1>
              <div className="w-full h-1/4">
                <div className="w-full h-2/5">
                  <label name="category" id="category" htmlFor="categories">
                    Category
                  </label>
                </div>
                <select className="w-1/5" name="categories" id="categories">
                  {loaderData.categories.map((category) => {
                    return (
                      <option
                        value={category.name}
                        id="categoryId"
                        name="categoryId"
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </>
          ) : (
            <p className="text-red-600">{loaderData.message}</p>
          )}
          <div className="w-full h-1/4">
            <div className="w-full h-1/2">
              <label htmlFor="productName">Product name</label>
            </div>
            <input
              className="border-solid border-2 w-full"
              type="text"
              id="productName"
              name="productName"
            ></input>
          </div>
          <div className="w-full h-1/40">
            <div className="w-full h-1/2">
              <label name="name" id="name" htmlFor="price">
                Price
              </label>
            </div>
            <input
              className="border-solid border-2 w-full"
              type="number"
              id="price"
              name="price"
            ></input>
          </div>
          <div className="w-full h-1/4">
            <button
              type="submit"
              className="w-1/4 h-2/5 bg-orange-300 text-white mt-[1rem]"
            >
              Add Product
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default AddProduct;

export async function action({ request }) {
  const formData = await request.formData();

  const productName = formData.get("productName");

  console.log(productName);

  const categoryId = formData.get("categoryId");

  console.log(categoryId);
}

export async function loader() {
  const response = await getCategories();

  return response;
}
