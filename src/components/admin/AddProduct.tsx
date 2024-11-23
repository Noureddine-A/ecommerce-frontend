import React, { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { addProduct } from "./util/adminHttp.ts";
import { Product } from "../../types/Product.ts";
import { Error } from "../../types/Error.ts";
import { Response } from "../../types/Response.ts";

import { TailSpin } from "react-loader-spinner";

const AddProduct = () => {
  const [errors, setErrors] = useState<Error[]>();
  const [loading, setLoading] = useState(false);
  const actionData = useActionData() as Response;

  useEffect(() => {
    let errorList: Error[] = [];

    if (actionData?.error && typeof actionData.message === "object") {
      Object.keys(actionData.message).forEach((key) => {
        errorList.push({
          errorMsg: actionData.message[key][0],
          errorArea: key,
        });
      });
    } else if (actionData?.error && typeof actionData.message === "string") {
      errorList.push({
        errorMsg: actionData.message as string,
        errorArea: null,
      });
    }
    setErrors(errorList);
    setLoading(false);
  }, [actionData]);

  function onSubmitFormHandler() {
    setLoading(true);
    setErrors([]);
  }

  return (
    <div className="h-[70vh] w-full">
      <Form
        method="post"
        action="/admin/add-product"
        className="grid grid-cols-2 h-full w-full"
        encType="multipart/form-data"
        onSubmit={onSubmitFormHandler}
      >
        <div className="grid grid-rows-[1fr,1fr,1fr,4fr] h-full w-full">
          <h1 className="text-2xl">Add Product</h1>
          <div className="grid grid-rows-2 h-full w-full">
            <label className="mr-[1rem]" htmlFor="name">
              Name
            </label>
            <input
              className="border-2 border-gray-500 px-[1rem] w-[70%]"
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="grid grid-rows-2 h-full w-full">
            <label className="mr-[1rem]" htmlFor="price">
              Price
            </label>
            <input
              className="border-2 border-gray-500 px-[1rem] w-[70%]"
              type="number"
              name="price"
              id="price"
            />
          </div>
          <div className="grid grid-rows-[1fr,5fr] h-full w-full">
            <label className="mr-[1rem]" htmlFor="description">
              Description
            </label>
            <textarea
              className="border-2 border-gray-500 w-[80%]"
              name="description"
              id="description"
            />
          </div>
        </div>
        <div className="grid grid-rows-[1fr,1fr,1fr,1fr,1fr,2fr] w-full h-full">
          {errors ? (
            <div>
              {errors.map((error, index) => {
                return (
                  <p key={index} className="text-red-500">
                    {error.errorMsg}
                  </p>
                );
              })}{" "}
            </div>
          ) : (
            <div />
          )}
          <div className="grid grid-rows-2 h-full w-full">
            <label htmlFor="categories">Category</label>
            <select className="w-[70%]" name="categories" id="categories">
              <option value="1">Kids</option>
              <option value="2">Women</option>
              <option value="3">Men</option>
            </select>
          </div>
          <div className="grid grid-rows-2 h-full w-full">
            <label htmlFor="categories">Subcategory</label>
            <select className="w-[70%]" name="subCategories" id="subCategories">
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
            </select>
          </div>
          <div className="grid grid-rows-2 h-full w-full">
            <label htmlFor="sizes">Size</label>
            <div className="flex gap-[1rem]">
              <div>
                <label className="mr-[0.5rem]" htmlFor="small">
                  Small
                </label>
                <input type="checkbox" id="small" name="sizes" value="small" />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="medium">
                  Medium
                </label>
                <input
                  type="checkbox"
                  id="medium"
                  name="sizes"
                  value="medium"
                />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="large">
                  Large
                </label>
                <input type="checkbox" id="large" name="sizes" value="large" />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="extaLarge">
                  Extra Large
                </label>
                <input
                  type="checkbox"
                  id="extraLarge"
                  name="sizes"
                  value="extraLarge"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 h-full w-full">
            <label htmlFor="image">Photo</label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              className=""
            />
          </div>
          <div className="flex items-center h-full w-full">
            {loading ? (
              <TailSpin height="60" width="60" radius="4" color="black" />
            ) : (
              <button className="w-2/5 h-1/4 bg-slate-950 text-white hover:cursor-pointer ">
                Add Product
              </button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;

export async function action({ request }) {
  const formData = await request.formData();

  const decodedImages: Promise<string>[] = [];

  formData.getAll("images").forEach((image) => {
    const decodedImage = convertImageToB64(image);
    decodedImages.push(decodedImage);
  });

  const resolvedDecodedImages = await Promise.all(decodedImages);

  const product = new Product(
    formData.get("name") as string,
    formData.get("price") as number,
    formData.get("description") as string,
    formData.get("categories") as string,
    formData.get("subCategories") as string,
    formData.getAll("sizes"),
    resolvedDecodedImages
  );

  const response = await addProduct(product);

  return response;
}

function convertImageToB64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result !== null) {
        const b64 = reader.result.toString().split(",", 2)[1];
        resolve(b64);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
