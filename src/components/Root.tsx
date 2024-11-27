import React from "react";
import Navbar from "./Navbar.tsx";
import { Outlet } from "react-router-dom";

import AuthContextProvider from "./store/AuthContext.tsx";
import Footer from "./Footer.tsx";

const Root = () => {
  return (
    <AuthContextProvider>
      <div className="block mx-[5rem] max-sm:mx-[0rem] max-lg:mx-[1rem]">
        <Navbar />
      </div>
      <div className="min-h-[100vh] w-full px-[5rem] max-lg:px-[1rem]">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </AuthContextProvider>
  );
};

export default Root;
