import React from "react";
import { Form } from "react-router-dom";
import { addProduct } from "./util/adminHttp";

const AddProduct = () => {
  function handleFileEvent(e) {
    console.log(e.target.files);
  }
  return (
    <div className="h-[70vh] w-full">
      <Form
        method="post"
        action="/admin/add-product"
        className="grid grid-cols-2 h-full w-full"
        onSubmit={handleFileEvent}
        encType="multipart/form-data"
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
              type="text"
              name="description"
              id="description"
            />
          </div>
        </div>
        <div className="grid grid-rows-[1fr,1fr,1fr,1fr,1fr,2fr] w-full h-full">
          <div />
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
                <input type="checkbox" id="small" name="small" value="small" />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="medium">
                  Medium
                </label>
                <input
                  type="checkbox"
                  id="medium"
                  name="medium"
                  value="medium"
                />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="large">
                  Large
                </label>
                <input type="checkbox" id="large" name="large" value="large" />
              </div>
              <div>
                <label className="mr-[0.5rem]" htmlFor="extaLarge">
                  Extra Large
                </label>
                <input
                  type="checkbox"
                  id="extraLarge"
                  name="extraLarge"
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
            />
          </div>
          <div className="flex items-center h-full w-full">
            <button className="w-2/5 h-1/4 bg-slate-950 text-white hover:cursor-pointer ">
              Add Product
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;

export async function action({ request }) {
  const formData = await request.formData();

  const product = {
    name: formData.get("name"),
    price: formData.get("price"),
    description: formData.get("description"),
    category: formData.get("categories"),
    subCategory: formData.get("subCategories"),
    sizes: getSizes(formData),
    images: formData.getAll("images"),
  };

  const response = addProduct(product);

  return null;
}

function getSizes(formData) {
  const sizes = ["small", "medium", "large", "extraLarge"];

  let inputSizes = [];

  const list = sizes.forEach((size) => {
    if (formData.get(size) !== null) {
      inputSizes.push(formData.get(size));
    }
  });

  return inputSizes;
}
