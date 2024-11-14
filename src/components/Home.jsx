import React from "react";

import Hero from "../assets/images/hero_img.png";

const Home = () => {
  return (
    <div className="flex w-full h-[35rem] border-2 border-zinc-400">
      <div className="flex justify-center items-center w-[50%] h-full">
        <div className="h-[30%] w-[60%]">
          <div className="flex items-center w-full h-[20%]">
            <div className="bg-slate-950 h-[5%] w-[50px]" />
            <div className="flex items-center h-full w-[80%] px-[1rem]">
              <h4 className="">OUR BESTSELLERS</h4>
            </div>
          </div>
          <div classname="h-[40%] w-full">
            <h1 className="prata-regular text-6xl">Latest Arrivals</h1>
          </div>
          <div className="flex w-full h-[20%]">
            <div className="flex items-center h-full w-fit">
              <h4 className="">SHOP NOW</h4>
            </div>
            <div className="flex items-center h-full w-[60%] px-[1rem]">
              <div className="bg-slate-950 h-[5%] w-[50px]" />
            </div>
          </div>
        </div>
      </div>
      <div
        className="h-full w-[50%]">
          <img className="h-full w-full" src={Hero} alt={Hero}/>
        </div>
    </div>
  );
};

export default Home;
