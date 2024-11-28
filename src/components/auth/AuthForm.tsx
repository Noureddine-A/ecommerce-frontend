import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Link,
  Form,
  useActionData,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { AuthContext } from "../store/AuthContext.tsx";

import { TailSpin } from "react-loader-spinner";

import AuthInput from "./AuthInput.tsx";
import { authenticate } from "./util/http.ts";
import { User } from "../../types/User.ts";
import { Response } from "../../types/Response.ts";
import { Error } from "../../types/Error.ts";
import Footer from "../Footer.tsx";

const AuthForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error[]>();
  const authCtx = useContext(AuthContext);

  const actionData = useActionData() as Response;
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData !== null && actionData?.error === true) {
      let errorList: Error[] = [];

      if (typeof actionData.message === "object") {
        Object.keys(actionData.message).forEach((key) => {
          errorList.push({
            errorMsg: actionData.message[key][0],
            errorArea: key,
          });
        });

        setError(errorList);
        setLoading(false);
      }
    } else if (actionData !== null && actionData?.error === false) {
      if (actionData.isAdmin === true) {
        authCtx.changeAdmin("true");
      }
      authCtx.changeAuth("true");
      navigate("/");
    }
  }, [actionData]);

  const { pathname } = useLocation();

  let placeholders: string[] = [];

  if (pathname === "/login") {
    placeholders = ["Email", "Password"];
  } else {
    placeholders = ["Name", "Email", "Password"];
  }

  function onCreateHandler() {
    if (loading === false) {
      setLoading(true);
    }
  }

  function onChangeFormHandler() {
    setError(undefined);
  }

  return (
    <Fragment>
    <div className="w-full h-[70vh] flex justify-center">
      <Form
        method="post"
        action={pathname}
        onSubmit={onCreateHandler}
        className="w-3/6 h-fit max-sm:w-full"
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
    <Footer/>
    </Fragment>
  );
};

export default AuthForm;

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let user: User;

  let route: string;

  if (formData.get("/signup") !== null) {
    user = new User(
      formData.get("Email") as string,
      formData.get("Password") as string,
      formData.get("Name") as string
    );

    console.log(formData.get("Name"));
    route = "signup";
  } else {
    user = new User(
      formData.get("Email") as string,
      formData.get("Password") as string
    );
    route = "login";
  }

  const response = await authenticate(user, route);

  return response;
}

