import React, { Fragment } from "react";

import Hero from "../assets/images/hero_img.png";
import LatestCollection from "./product/latest/LatestCollection.tsx";
import { getLatestCollection } from "./product/util/productHttp.ts";
import OurPolicy from "./policy/OurPolicy.tsx";

const Home = () => {
  return (
    <div className="h-[00vh] w-full">
      <div className="flex flex-cols w-full h-[60vh] border-2 border-gray-300 max-[820px]:h-[80vh] max-sm:grid max-sm:grid-rows-[1fr,2fr] max-sm:h-fit">
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
      <LatestCollection />
      <OurPolicy />
    </div>
  );
};

export default Home;

export async function loader() {
  const latestCollection = await getLatestCollection();

  return latestCollection;
}
