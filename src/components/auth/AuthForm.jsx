import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  Form,
  useActionData,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

import { TailSpin } from "react-loader-spinner";

import AuthInput from "./AuthInput";
import { authenticate } from "./util/http";

const AuthForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const actionData = useActionData();

  let placeholders = [];

  if (pathname === "/login") {
    placeholders = ["Email", "Password"];
  } else {
    placeholders = ["Name", "Email", "Password"];
  }

  useEffect(() => {
    if ((actionData !== undefined) & (actionData?.status !== 200)) {
      let errorList = [];

      Object.keys(actionData).forEach((key) => {
        errorList.push({ errorMsg: actionData[key][0], errorArea: key });
      });
      setLoading(false);
      setError(errorList);
    } else if (actionData?.status === 200) {
      if (actionData.isAdmin === true) {
        authContext.changeAdmin(true);
      }
      authContext.changeAuth(true);
      navigate("/");
    }
  }, [actionData]);

  function onCreateHandler() {
    if (loading === false) {
      setLoading(true);
    }
  }

  function onChangeFormHandler() {
    setError(undefined);
  }

  return (
    <div className="w-full h-[60vh] flex justify-center">
      <Form
        method="post"
        action={pathname}
        onSubmit={onCreateHandler}
        className="w-3/6 h-fit"
      >
        <input type="hidden" id={pathname} name={pathname} />
        <div className="grid grid-cols-2 w-full h-[10vh]">
          <div className="flex w-full h-full justify-end items-center">
            {pathname === "/login" ? (
              <h1 className="text-3xl prata-regular">Login</h1>
            ) : (
              <h1 className="text-3xl prata-regular">Sign Up</h1>
            )}
          </div>
          <div className="flex justify-start items-center h-full w-full">
            <div className="bg-slate-950 h-[5%] w-[50px] ml-[0.5rem]" />
          </div>
        </div>
        <div className="flex flex-col gap-[1rem] w-full h-full">
          {placeholders.map((placeholder, index) => {
            return (
              <AuthInput
                key={index}
                placeholder={placeholder}
                error={error}
                pathname={pathname}
              />
            );
          })}
        </div>
        <div className="grid grid-rows-[1fr,4fr] mt-[1rem]">
          <div className="flex justify-end w-full h-full">
            {pathname === "/login" ? (
              <NavLink
                className="hover:cursor-pointer text-sm"
                to="/signup"
                onClick={onChangeFormHandler}
              >
                Create account
              </NavLink>
            ) : (
              <NavLink
                className="hover:cursor-pointer text-sm"
                to="/login"
                onClick={onChangeFormHandler}
              >
                Login Here
              </NavLink>
            )}
          </div>
          <div className="flex justify-center items-center w-full h-full">
            {loading ? (
              <TailSpin height="60" width="60" radius="4" color="black" />
            ) : (
              <button className="w-2/5 h-1/2 bg-slate-950 text-white hover:cursor-pointer">
                {pathname === "/login" ? "Sign In" : "Sign Up"}
              </button>
            )}
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;

export async function action({ request }) {
  let formData = await request.formData();

  let user;
  let route;

  if (formData.get("/signup") !== null) {
    user = {
      name: formData.get("Name"),
      email: formData.get("Email"),
      password: formData.get("Password"),
    };

    route = "signup";
  } else {
    user = {
      email: formData.get("Email"),
      password: formData.get("Password"),
    };

    route = "login";
  }

  const response = await authenticate(user, route);

  if (response.status === 200) {
    return { status: response.status, isAdmin: response.data.admin };
  }

  return response;
}
