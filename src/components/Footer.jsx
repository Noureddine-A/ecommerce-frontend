import React from "react";

import Logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <section id="footer">
      <div className="grid grid-cols-2 h-[15rem] w-full">
        <div className="grid grid-rows-[2fr,3fr] h-full w-full">
          <div className="flex items-center h-full w-full">
            <img src={Logo} alt={Logo} />
          </div>
          <div className="h-full w-full">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 h-full w-full">
          <div className="grid justify-center grid-rows-[1fr,4fr] h-full w-full">
            <h1 className="font-bold text-2xl">COMPANY</h1>
            <div className="flex flex-col gap-[0.5rem] h-full w-full">
              <ul>Home</ul>
              <ul>About us</ul>
              <ul>Delivery</ul>
              <ul>Privacy policy</ul>
            </div>
          </div>
          <div className="grid justify-center grid-rows-[1fr,4fr] h-full w-full">
            <h1 className="font-bold text-2xl">GET IN TOUCH</h1>
            <div className="flex flex-col gap-[0.5rem] h-full w-full">
              <p>+1-212-456-7890</p>
              <p>contact@foreveryou.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
