import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRoot = () => {
  const navigate = useNavigate();


  return (
    <div className="flex w-full h-full">
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminRoot;
