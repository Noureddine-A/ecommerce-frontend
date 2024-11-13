import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  Form,
  useActionData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../store/AuthContext";

import { TailSpin } from "react-loader-spinner";

import AuthInput from "./AuthInput";
import { authenticate } from "../util/http";

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
      if(actionData.isAdmin === true) {
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
    <Form
      onSubmit={onCreateHandler}
      method="post"
      action={pathname}
      className="flex justify-center items-center h-full w-full"
    >
      <div className="w-3/5 h-fit py-[1rem] px-[2rem] rounded-md border-x-2 border-gray-200 border-y-2">
        <input type="hidden" name={pathname} id={pathname} value={pathname} />
        <div className="w-full h-fit">
          {pathname === "/signup" ? (
            <h1 className="text-3xl pb-[1rem] font-semibold">
              Create your account
            </h1>
          ) : (
            <h1 className="text-3xl pb-[1rem] font-semibold">Login</h1>
          )}

          <p className="text-sm pb-[1rem]">Enter your details below</p>
          <div className="grid">
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
        </div>
        <div className="w-full h-[20vh]">
          {!loading ? (
            <button
              type="submit"
              className="w-3/5 h-[40%] mt-[1rem] bg-red-500 text-white rounded-md mb-[0.5rem]"
            >
              {pathname === "/signup" ? "Create your account" : "Login"}
            </button>
          ) : (
            <TailSpin height="60" width="60" radius="4" color="red" />
          )}

          <div className="flex w-3/5 h-[40%]">
            {pathname === "/signup" ? (
              <>
                <p className="text-sm mr-[0.5rem]">Already have an account?</p>
                <Link
                  to="/login"
                  onClick={onChangeFormHandler}
                  className="text-sm underline text-semibold"
                >
                  Log in
                </Link>{" "}
              </>
            ) : (
              <>
                <p className="text-sm mr-[0.5rem]">No account?</p>
                <Link
                  to="/signup"
                  onClick={onChangeFormHandler}
                  className="text-sm underline text-semibold"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </Form>
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
    return {status: response.status, isAdmin: response.data.admin}
  }

  return response;
}
