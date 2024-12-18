import React from "react";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

import AuthContextProvider from "./store/AuthContext.tsx";
import SearchContextProvider from "./store/SearchContext.tsx";
import CartContextProvider from "./store/CartContext.tsx";

const Root = () => {
  return (
    <CartContextProvider>
      <SearchContextProvider>
        <AuthContextProvider>
          <div className="block mx-[5rem] max-sm:mx-[0rem] max-lg:mx-[1rem]">
            <Navbar />
          </div>
          <div className="min-h-[100vh] w-full px-[5rem] max-lg:px-[1rem]">
            <Outlet />
          </div>
        </AuthContextProvider>
      </SearchContextProvider>
    </CartContextProvider>
  );
};

export default Root;
