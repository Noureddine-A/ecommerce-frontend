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
    setIsAuth(auth);
  }

  function changeAdmin(value) {
    // Fix that the user state persists after page reload by sending a request to the backend requesting whether the user is authenticated and then use that info
    // to reload the isAdmin state to true 
    if (!localStorage.getItem("admin")) {
      localStorage.setItem("admin", true);
      setIsAdmin(value);
    } else {
      setIsAdmin(localStorage.getItem("admin"));
    }
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
