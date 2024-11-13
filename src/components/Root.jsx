import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import AuthContextProvider from "./store/AuthContext";

const Root = () => {
  return (
    <AuthContextProvider>
      <div className="block">
        <Navbar />
        <div className="h-[85vh] w-full">
          <Outlet />
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default Root;
