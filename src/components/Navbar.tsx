import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { AuthContext } from "./store/AuthContext.tsx";
import { logout } from "../components/auth/util/http.ts";

import Logo from "../assets/images/logo.png";
import Cart from "../assets/images/cart_icon.png";
import Profile from "../assets/images/profile_icon.png";
import Search from "../assets/images/search_icon.png";
import Menu from "../assets/images/menu_icon.png";
import Dropdown from "../assets/images/dropdown_icon.png";

import { isAuth, isAdmin } from "../components/auth/util/is-auth";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [visible, setVisibile] = useState(false);
  const [menu, setMenu] = useState(false);

  async function onLogoutHandler() {
    const loggedOut = await logout();

    if (loggedOut) {
      authContext.changeAuth("false");
      authContext.changeAdmin("false");
      navigate("/");
    }
  }

  function onHover() {
    setVisibile(true);
  }

  function onLeave() {
    setVisibile(false);
  }

  function onShowMenuHandler() {
    setMenu(true);
  }

  function onCloseMenuHandler() {
    setMenu(false);
  }

  return (
    <section id="navbar">
      <div className="grid grid-cols-[1fr,4fr,1fr] w-full h-[15vh] max-sm:grid-cols-[3fr,1fr,3fr]">
        <div className="flex items-center">
          <img src={Logo} alt={Logo} className="max-sm:h-1/2 pl-[0.5rem]" />
        </div>
        <nav className="flex justify-center items-center gap-[1rem] w-full h-full">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive
                ? "border-b-2 border-orange-600 max-sm:hidden"
                : "hover:border-b-2 border-orange-600 max-sm:hidden";
            }}
          >
            HOME
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) => {
              return isActive
                ? "border-b-2 border-orange-600 max-sm:hidden"
                : "hover:border-b-2 border-orange-600 max-sm:hidden";
            }}
          >
            COLLECTION
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => {
              return isActive
                ? "border-b-2 border-orange-600 max-sm:hidden"
                : "hover:border-b-2 border-orange-600 max-sm:hidden";
            }}
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => {
              return isActive
                ? "border-b-2 border-orange-600 max-sm:hidden"
                : "hover:border-b-2 border-orange-600 max-sm:hidden";
            }}
          >
            CONTACT
          </NavLink>
        </nav>
        <div className="grid grid-cols-3 max-sm:grid-cols-4">
          <div className="flex items-center">
            <img
              className="h-6 hover:cursor-pointer"
              src={Search}
              alt={Search}
            />
          </div>
          <div className="flex items-center">
            <img
              className="h-6 hover:cursor-pointer"
              onMouseOver={onHover}
              onMouseLeave={onLeave}
              src={Profile}
              alt={Profile}
            />
          </div>
          {visible && (
            <div
              onMouseOver={onHover}
              onMouseLeave={onLeave}
              className={`absolute top-[9%] w-32 ${
                isAdmin() === true ? "h-28" : "h-20"
              } bg-gray-200 rounded-md px-[1rem]`}
            >
              <div
                className={`grid ${
                  isAdmin() === true ? "grid-rows-3" : "grid-rows-2"
                } items-center w-full h-full text-black text-sm`}
              >
                {isAdmin() === true && (
                  <NavLink to="/admin">Admin Panel</NavLink>
                )}
                <NavLink to="">Orders</NavLink>
                {isAuth() === true ? (
                  <p className="hover:cursor-pointer" onClick={onLogoutHandler}>
                    Logout
                  </p>
                ) : (
                  <NavLink to="/login">Login</NavLink>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center relative">
            <img className="h-6 hover:cursor-pointer" src={Cart} alt={Cart} />
            <div className="flex justify-end">
              <div className="absolute rounded-full bottom-[33%] w-[18px] h-[18px] text-center bg-slate-950 text-[10px] max-lg:bottom-[37%] text-white">
                10
              </div>
            </div>
          </div>
          <div
            className="flex items-center hidden max-sm:flex"
            onClick={onShowMenuHandler}
          >
            <img className="h-6 hover:cursor-pointer" src={Menu} alt={Menu} />
          </div>
        </div>
      </div>
      {menu && (
        <div className="absolute top-0 w-full h-[35vh] bg-white">
          <div className="flex w-full h-[20%]">
            <div className="flex items-center basis-1/5 pl-[1rem]">
              <img
                className="rotate-180 hover:cursor-pointer"
                onClick={onCloseMenuHandler}
                src={Dropdown}
                alt={Dropdown}
              />
            </div>
            <div className="flex items-center basis-4/6">
              <p>Back</p>
            </div>
          </div>
          <div className="w-full h-[80%]">
            <div className="flex items-center w-full h-1/4 border-y-2">
              <NavLink to="/" onClick={onCloseMenuHandler} className="ml-[1rem]">
                HOME
              </NavLink>
            </div>
            <div className="flex items-center w-full h-1/4 border-b-2">
              <NavLink to="/" className="ml-[1rem]">
                COLLECTION
              </NavLink>
            </div>
            <div className="flex items-center w-full h-1/4 border-b-2">
              <NavLink to="/" className="ml-[1rem]">
                ABOUT
              </NavLink>
            </div>
            <div className="flex items-center w-full h-1/4 border-b-2">
              <NavLink to="/" className="ml-[1rem]">
                CONTACT
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;

{
  /* <section id="navbar">
      <div className="flex w-full h-[15vh]">
        <div className="flex items-center w-1/5 h-full max-sm:w-[40%]">
          <img className="h-1/2 max-sm:w-full" src={Logo} alt={Logo} />
        </div>
        <nav
          className="flex w-[80%] h-full text-white 
         list-none gap-[2rem]"
        >
          <div className="flex text-black font-medium justify-center items-center gap-[1rem] w-[75%] h-full max-sm:w-[0%]">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600 max-sm:hidden"
                  : "hover:border-b-2 border-orange-600 max-sm:hidden";
              }}
            >
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600 max-sm:hidden"
                  : "hover:border-b-2 border-orange-600 max-sm:hidden";
              }}
            >
              COLLECTION
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600 max-sm:hidden"
                  : "hover:border-b-2 border-orange-600 max-sm:hidden";
              }}
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => {
                return isActive
                  ? "border-b-2 border-orange-600 max-sm:hidden"
                  : "hover:border-b-2 border-orange-600 max-sm:hidden";
              }}
            >
              CONTACT
            </NavLink>
          </div>
          <div className="flex gap-[1.5rem] justify-center items-center w-[25%] h-full max-sm:w-[60%] max-sm:justify-end max-sm:w-full">
            <img
              className="h-6 hover:cursor-pointer"
              src={Search}
              alt={Search}
            />
            <div
              className="relative"
              onMouseOver={onHover}
              onMouseLeave={onLeave}
            >
              <NavLink to="/login">
                <img
                  className="h-6 hover:cursor-pointer"
                  src={Profile}
                  alt={Profile}
                />
              </NavLink>
              {visible && isAuth() === "true" && (
                <div
                  onMouseOver={onHover}
                  onMouseLeave={onLeave}
                  className={`absolute right-0 top-[24px] w-32 ${
                    isAdmin() === "true" ? "h-28" : "h-20"
                  } bg-gray-200 rounded-md px-[1rem]`}
                >
                  <div
                    className={`grid ${
                      isAdmin() === "true" ? "grid-rows-3" : "grid-rows-2"
                    } items-center w-full h-full text-black text-sm`}
                  >
                    {isAdmin() === "true" && (
                      <NavLink to="/admin">Admin Panel</NavLink>
                    )}
                    <NavLink to="">Orders</NavLink>
                    {isAuth() === "true" ? (
                      <p
                        className="hover:cursor-pointer"
                        onClick={onLogoutHandler}
                      >
                        Logout
                      </p>
                    ) : (
                      <NavLink to="/login">Login</NavLink>
                    )}
                  </div>
                </div>
              )}
            </div>
            {isAuth() === "true" && (
              <div className="relative hover:cursor-pointer">
                <img className="h-6" src={Cart} alt={Cart} />
                <div className="absolute top-3 rounded-full right-[-4px] w-[18px] h-[18px] text-center bg-slate-950 text-[10px]">
                  10
                </div>
              </div>
            )}
            <div className="invisible max-sm:visible">
              <img className="h-6 hover:cursor-pointer" src={Menu} alt={Menu} />
            </div>
          </div>
        </nav>
      </div>
    </section> */
}
