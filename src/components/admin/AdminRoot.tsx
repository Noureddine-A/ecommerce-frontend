import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer.tsx";

const AdminRoot = () => {

  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full">
        <Outlet />
        <Footer/>
      </div>
    </div>
  );
};

export default AdminRoot;
