import React from "react";
import LatestCollectionItem from "./LatestCollectionItem.tsx";
import { useLoaderData } from "react-router-dom";
import { Product } from "../../../types/Product.ts";

const LatestCollection = () => {
  const loaderData = useLoaderData() as Product[];

  return (
    <div className="w-full h-fit">
      <div className="h-fit w-full">
        <div className="flex flex-col justify-center items-center h-[20vh] w-full">
          <h1 className="text-xl mr-[0.5rem] mb-[1rem]">
            LATEST <strong>COLLECTIONS</strong>
          </h1>
          <p className="text-center">
            These items have recently been added to our collection.
          </p>
        </div>
        <div className="flex flex-wrap w-full h-fit">
          {loaderData.map((product, index) => {
            return (
              <LatestCollectionItem
                key={index}
                id={product.id}
                image={product.images[0]}
                name={product.name}
                price={product.price}
                product={product}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
