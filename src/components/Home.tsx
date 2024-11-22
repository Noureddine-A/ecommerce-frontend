import React from "react";

import Hero from "../assets/images/hero_img.png";

const Home = () => {
  return (
    <div className="flex flex-cols w-full h-[30rem] border-2 border-gray-300 max-[820px]:h-[25rem] max-sm:grid max-sm:grid-rows-[1fr,2fr] max-sm:h-fit">
      <div className="flex justify-center items-center h-full w-full">
        <div className="flex-row h-fit w-3/5 max-lg:w-4/6 max-[820px]:w-4/5">
          <div className="flex items-end w-full h-[4rem] justify-center">
            <div className="flex items-center h-[40%] basis-1/6">
              <div className="h-[1px] w-[50px] bg-slate-950" />
            </div>
            <div className="flex items-center h-[40%] basis-5/6 ml-[0.5rem]">
              <p className="text-sm">OUR BESTSELLERS</p>
            </div>
          </div>
          <div className="flex items-center w-full h-[4rem]">
            <h1 className="prata-regular text-4xl max-lg:text-3xl">
              Latest Arrivals
            </h1>
          </div>
          <div className="flex items-start w-full h-[4rem] ">
            <div className="flex items-center h-[40%] w-fit">
              <p className="text-sm">SHOP NOW</p>
            </div>
            <div className="flex items-center h-[40%] basis-4/6 pl-[0.5rem]">
              <div className="h-[1px] w-[50px] bg-slate-950" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full">
        <img className="w-full h-full" src={Hero} alt={Hero} />
      </div>
    </div>
  );
};

export default Home;

{
  /* <div className="flex justify-center items-center w-[50%] h-full max-sm:w-full max-sm:h-full max-sm:justify-center">
        <div className="h-[30%] w-[60%] max-sm:h-full max-sm:w-4/6 max-sm:h-full max-sm:h-[50%] max-sm:pl-[1rem] max-lg:h-[50%] max-lg:w-4/6">
          <div className="flex items-center w-full h-[20%] max-sm:justify-center max-sm:h-[20%]">
            <div className="bg-slate-950 h-[5%] w-[50px]" />
            <div className="flex items-center h-full w-[80%] px-[1rem] max-sm:text-xs max-sm:w-full">
              <h4 className="">OUR BESTSELLERS</h4>
            </div>
          </div>
          <div className="h-fit w-full max-sm:h-fit">
            <h1 className="prata-regular text-4xl max-sm:text-3xl max-sm:w-full">
              Latest Arrivals
            </h1>
          </div>
          <div className="flex w-full h-[20%] max-sm:h-full max-sm:items-start max-sm:h-[20%]">
            <div className="flex items-center h-full w-fit max-sm:text-xs">
              <h4 className="">SHOP NOW</h4>
            </div>
            <div className="flex items-center h-full w-[60%] px-[1rem]">
              <div className="bg-slate-950 h-[5%] w-[50px]" />
            </div>
          </div>
        </div>
      </div> */
}
