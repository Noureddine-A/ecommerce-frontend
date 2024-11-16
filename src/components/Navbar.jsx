import React, { useContext, useState } from "react";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";

import { AuthContext } from "./store/AuthContext";
import { logout } from "./util/http";

import Logo from "../assets/images/logo.png";
import Cart from "../assets/images/cart_icon.png";
import Profile from "../assets/images/profile_icon.png";
import Search from "../assets/images/search_icon.png";
import { isAuth, isAdmin } from "./util/is-auth";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [visible, setVisibile] = useState(false);

  async function onLogoutHandler() {
    const loggedOut = await logout();

    if (loggedOut) {
      authContext.changeAuth(false);
      authContext.changeAdmin(false);
      navigate("/");
    }
  }

  function onHover() {
    setVisibile(true);
  }

  function onLeave() {
    setVisibile(false);
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
                    {isAdmin() === "true" && <NavLink to="/admin">Admin Panel</NavLink>}
                    <NavLink>Orders</NavLink>
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
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Navbar;
