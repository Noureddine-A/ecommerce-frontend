import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./store/AuthContext";
import { logout, test } from "./util/http";

const Navbar = () => {
  const authContext = useContext(AuthContext);

  async function onLogoutHandler() {
    const loggedOut = await logout();

    if (loggedOut) {
      authContext.changeAuth(false);
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
          {authContext.isAdmin && (
            <NavLink to ="/admin/add-product" className="hover:cursor-pointer hover:text-orange-500">
              About
            </NavLink>
          )}
          {!authContext.isAuth ? (
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
