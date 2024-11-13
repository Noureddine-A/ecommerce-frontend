import React, { useContext } from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import { logout } from "./auth/util/http";
import { isAdmin, isAuth } from "./auth/util/is-auth";


const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  async function onLogoutHandler() {
    const loggedOut = await logout();

    if (loggedOut) {
      authContext.logoutUser();
      navigate("/");
    }
  }

  return (
    <section id="navbar">
      <div className="flex w-full h-[15vh] bg-neutral-950">
        <div className="flex justify-center items-center w-[25%] h-full">
          <h1 className="text-white text-3xl">Webshop</h1>
        </div>
        <nav
          className="flex w-[75%] h-full text-white justify-center
        items-center list-none gap-[2rem]"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500"
                : "hover:cursor-pointer hover:text-orange-500"
            }
          >
            Home
          </NavLink>
          {isAdmin() && (
            <NavLink
              to="/admin/add-product"
              className="hover:cursor-pointer hover:text-orange-500"
            >
              About
            </NavLink>
          )}
          {!isAuth() ? (
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500"
                  : "hover:cursor-pointer hover:text-orange-500"
              }
            >
              Sign Up
            </NavLink>
          ) : (
            <button onClick={onLogoutHandler}>Log Out</button>
          )}
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
