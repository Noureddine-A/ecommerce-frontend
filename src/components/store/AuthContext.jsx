import { createContext, useState } from "react";

export const AuthContext = createContext({
  login: null,
  loginUser: () => {},
  logoutUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  function loginUser(isAdmin) {
    if (isAdmin) {
      localStorage.setItem("admin", true);
    } else {
      localStorage.setItem("admin", false);
    }

    localStorage.setItem("auth", true);

    setLogin(true);
  }

  function logoutUser() {
    if (localStorage.getItem("admin") === "true") {
      localStorage.removeItem("admin");
    }

    localStorage.removeItem("auth");

    setLogin(false);
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
