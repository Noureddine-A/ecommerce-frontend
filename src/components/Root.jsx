import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./store/AuthContext";
import Footer from "./Footer";

const Root = () => {
  return (
    <AuthContextProvider>
      <div className="block mx-[5rem]">
        <Navbar />
        <div className="h-fit w-full">
          <Outlet />
        </div>
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default Root;
