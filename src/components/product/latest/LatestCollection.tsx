import React from "react";
import LatestCollectionItem from "./LatestCollectionItem.tsx";
import { useLoaderData } from "react-router-dom";
import { Product } from "../../../types/Product.ts";

const LatestCollection = () => {
  const loaderData = useLoaderData() as Product[];

  return (
    <div className="w-full h-fit">
      <div className="h-[10rem] w-full">
        <div className="flex justify-center items-end h-1/2 w-full">
          <h1 className="text-xl mr-[0.5rem]">
            LATEST <strong>COLLECTIONS</strong>
          </h1>
        </div>
        <div className="flex w-full justify-center items-center h-1/2">
          <p>These items have recently been added to our collection.</p>
        </div>
        <div className="flex flex-wrap w-full h-fit">
          {loaderData.map((product, index) => {
            return (
              <LatestCollectionItem
                key={index}
                image={product.images[0]}
                name={product.name}
                price={product.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
