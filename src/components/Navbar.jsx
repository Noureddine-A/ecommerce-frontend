import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "./store/AuthContext";
import { logout } from "./util/http";

import Logo from "../assets/images/logo.png";
import Cart from "../assets/images/cart_icon.png";
import Profile from "../assets/images/profile_icon.png";
import Search from "../assets/images/search_icon.png";

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
      <div className="flex w-full h-[15vh]">
        <div className="flex items-center w-[20%] h-full">
          <img className="h-[50%]" src={Logo} alt={Logo} />
        </div>
        <nav
          className="flex w-[80%] h-full text-white 
         list-none gap-[2rem]"
        >
          <div className="flex text-black font-medium justify-center items-center gap-[1rem] w-[75%] h-full">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600"
                  : "hover:border-b-2 border-orange-600";
              }}
            >
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600"
                  : "hover:border-b-2 border-orange-600";
              }}
            >
              COLLECTION
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600"
                  : "hover:border-b-2 border-orange-600";
              }}
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600"
                  : "hover:border-b-2 border-orange-600";
              }}
            >
              CONTACT
            </NavLink>
          </div>
          <div className="flex gap-[1.5rem] justify-center items-center w-[25%] h-full">
            <img
              className="h-6 hover:cursor-pointer"
              src={Search}
              alt={Search}
            />
            <img
              className="h-6 hover:cursor-pointer"
              src={Profile}
              alt={Profile}
            />
            <div className="relative hover:cursor-pointer">
              <img className="h-6" src={Cart} alt={Cart} />
              <div className="absolute top-3 rounded-full right-[-4px] w-[18px] h-[18px] text-center bg-slate-950 text-[10px]">
                10
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
