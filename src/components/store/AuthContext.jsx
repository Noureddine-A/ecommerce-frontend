import { createContext, useState } from "react";

export const AuthContext = createContext({
  login: null,
  loginUser: () => {},
  logoutUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  function changeAuth(auth) {
    localStorage.setItem("auth", auth);
    setIsAuth(auth);
  }

  function changeAdmin(value) {
    localStorage.setItem("admin", value);
    setIsAdmin(value);
  }

  let ctxValue = {
    login,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
