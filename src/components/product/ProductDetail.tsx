import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const ProductDetail = () => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<number>(0);

  const { productId } = useParams();
  const { pathname, state } = useLocation();

  useEffect(() => {
    let b64String = "";
    let convertedImgs: string[] = [];

    window.scrollTo(0, 0);

    state.images.forEach((image) => {
      if (image.startsWith("iVB")) {
        b64String = "data:image/png;base64," + image;
        convertedImgs = [...convertedImgs, b64String];
      } else if (image.startsWith("/9j")) {
        b64String = "data:image/jpg;base64," + image;
        convertedImgs = [...convertedImgs, b64String];
      }
    });

    setImages(convertedImgs);
  }, [pathname]);

  return (
    <div className="grid grid-cols-2 h-fit w-full border-t-2 border-gray-300 pt-[2rem]">
      <div className="grid grid-cols-[1fr,6fr] gap-[0.5rem] w-full h-[65vh]">
        <div className="flex flex-col gap-[0.5rem] h-4/5 w-full">
          {images.map((image, index) => {
            return (
              <img
                onClick={() => {
                  setMainImage(index);
                }}
                className="w-full h-[100px] border-2 border-gray-200 mr-auto hover:cursor-pointer"
                src={image}
                alt={image}
              />
            );
          })}
        </div>
        <div className="h-4/5 w-full">
          <img
            className="w-4/6 h-full border-2 border-gray-200"
            src={images[mainImage]}
            alt={images[mainImage]}
          />
        </div>
      </div>
      <div className="inline-flex flex-col gap-[1rem] w-fit h-full border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold">{state.name}</h1>
        <h1 className="text-3xl font-bold">${state.price}</h1>
        <p className="text-sm text-gray-600 mb-[1rem] w-[40ch]">A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.
        </p>
        <div className="w-full h-fit">
          <p className="text-sm font-bold mb-[1rem]">Select Size</p>
          {state.sizes.map((size) => {
            return (
              <button className="w-[50px] h-[50px] bg-gray-300 mr-[0.5rem] rounded-sm hover:bg-slate-950 hover:text-white hover:rounded-sm">
                {(size === "Medium" && "M") ||
                  (size === "Large" && "L") ||
                  (size === "Extra Large" && "XL") ||
                  (size === "Small" && "S")}
              </button>
            );
          })}
        </div>
        <button className="bg-slate-950 text-white h-[40px] w-[150px] text-sm mt-[2rem]">ADD TO CART</button>
      </div>
    </div>
  );
};

export default ProductDetail;
