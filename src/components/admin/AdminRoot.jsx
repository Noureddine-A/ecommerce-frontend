import React, { useEffect, useReducer } from "react";
import { Outlet, NavLink, useNavigate, redirect } from "react-router-dom";
import { isAdmin } from "../auth/util/is-auth";

function reducer(state, action) {
  state = action.payload;
  return state;
}

const AdminRoot = () => {
  const [state, dispatch] = useReducer(reducer, "add-category");
  const navigate = useNavigate();

  function onAddProductHandler() {
    dispatch({ type: "add-product", payload: "add-product" });
  }

  function onAddCategoryHandler() {
    dispatch({ type: "add-category", payload: "add-category" });
  }

  useEffect(() => {
    navigate(state);
  }, [state]);

  return (
    <div className="flex w-full h-full">
      <div className="basis-1/6 h-full">
        <div
          onClick={onAddCategoryHandler}
          className={`flex justify-center items-center w-full h-1/4 cursor-pointer border-solid border-r-2 border-b-2 ${
            state === "add-category" ? "bg-orange-300" : ""
          }`}
        >
          <NavLink to="add-category">Add Category</NavLink>
        </div>
        <div
          onClick={onAddProductHandler}
          className={`flex justify-center items-center w-full h-1/4 cursor-pointer border-solid border-r-2 border-b-2 ${
            state === "add-product" ? "bg-orange-300" : ""
          }`}
        >
          <NavLink to="add-product">Add Product</NavLink>
        </div>
      </div>
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;

export function loader() {
  if (isAdmin() === false) {
    return redirect("/");
  }

  return null;
}
