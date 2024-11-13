import React, { useEffect, useState } from "react";
import { addCategory } from "./util/adminHttp";
import { Form, useActionData } from "react-router-dom";

import { TailSpin } from "react-loader-spinner";

const AddCategory = () => {
  const [loading, setLoading] = useState({ loading: false, message: undefined });
  const actionData = useActionData();

  useEffect(() => {
    if (loading && actionData?.message !== undefined) {
      setLoading({ loading: false, message: actionData.message });
    }
  }, [actionData]);

  function onAddHandler() {
    setLoading({ loading: true, success: false });
  }

  return (
    <Form
      method="post"
      action="/admin/add-category"
      className="w-full h-full px-[2rem] py-[2rem]"
      onSubmit={onAddHandler}
    >
      <div className="h-4/5 w-4/5">
        <h1 className="text-3xl mb-[2rem]">Add Category</h1>
        <div className="grid gap-[0.5rem] full h-fit">
          <div>
            <label htmlFor="categoryName">Category Name</label>
          </div>
          <input
            className="border-solid border-2"
            type="text"
            name="categoryName"
            id="categoryName"
          />
        </div>
        <div className="flex mt-[1rem] w-3/5 h-12">
          {!loading.loading ? (
            <button className="w-2/5 h-full bg-orange-300 text-white">
              Add
            </button>
          ) : (
            <TailSpin height="60" width="60" radius="4" color="orange" />
          )}

          {loading.message && <p className="ml-[1rem]">{loading.message}</p>}
        </div>
      </div>
    </Form>
  );
};

export default AddCategory;

export async function action({ request }) {
  const formData = await request.formData();

  const categoryName = formData.get("categoryName");

  const response = await addCategory(categoryName);

  if (response.status === 200) {
    return { success: true, message: response.data.message };
  }

  return { success: false, message: response.response.data.message };
}