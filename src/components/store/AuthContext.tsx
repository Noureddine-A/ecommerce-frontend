import { createContext} from "react";
import React from 'react';


export const AuthContext = createContext({
  changeAuth: (auth: string) => {},
  changeAdmin: (value: string) => {},
});

const AuthContextProvider = ({ children }) => {

  function changeAuth(auth: string) {
    localStorage.setItem("auth", auth);
  }

  function changeAdmin(value: string) {
    localStorage.setItem("admin", value);
  }

  let ctxValue = {
    changeAuth,
    changeAdmin
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
