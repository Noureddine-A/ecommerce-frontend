import React from "react";

import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <div className="grid h-[30vh] w-full grid-cols-2 absolute left-0 px-[5rem] bg-orange-50 max-sm:grid-rows-[1fr,2fr] max-sm:grid-cols-none max-sm:h-[50vh] max-sm:px-[1rem]">
      <div className="grid grid-rows-[1fr,3fr] h-full w-full">
        <div className="flex items-center h-full w-full">
          <img className="h-3/5 w-1/4" src={Logo} alt={Logo} />
        </div>
        <div className="h-full w-4/5 max-sm:w-full">
          <p className="text-sm">
            Forever is a webshop that offers the most trendy clothing to this
            day. We regularly update our collection so that you'll never miss
            out on the latest trend. You can always contact us to tell us what
            clothing or brands you would like to see in our collection.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 h-full w-full">
        <div className="grid grid-rows-[1fr,3fr] h-full w-full">
          <div className="flex h-full w-full items-center">
            <h1 className="font-bold">COMPANY</h1>
          </div>
          <div className="">
            <ul className="flex flex-col gap-[0.5rem] text-[14px]">
              <li>Home</li>
              <li>About us</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-rows-[1fr,3fr] h-full w-full">
          <div className="flex h-full w-full items-center">
            <h1 className="font-bold">GET IN TOUCH</h1>
          </div>
          <div className="">
            <ul className="flex flex-col gap-[0.5rem] text-[14px]">
              <li>+1-212-456-7890</li>
              <li>contact@foreveryou.com</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
