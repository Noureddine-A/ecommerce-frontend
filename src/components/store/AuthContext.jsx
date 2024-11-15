import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuth: false,
  isAdmin: false,
  changeAuth: () => {},
  changeAdmin: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  function changeAuth(auth) {
    localStorage.setItem("auth", auth);
    setIsAuth(auth);
  }

  function changeAdmin(value) {
    localStorage.setItem("admin", value);
    setIsAdmin(value);
  }

  let ctxValue = {
    changeAuth,
    isAuth,
    isAdmin,
    changeAdmin,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
