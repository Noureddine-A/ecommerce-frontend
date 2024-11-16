import { createContext} from "react";

export const AuthContext = createContext({
  login: null,
  loginUser: () => {},
  logoutUser: () => {},
});

const AuthContextProvider = ({ children }) => {

  function changeAuth(auth) {
    localStorage.setItem("auth", auth);
  }

  function changeAdmin(value) {
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
