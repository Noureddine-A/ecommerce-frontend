import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Footer from "../Footer.tsx";
import { CartContext } from "../store/CartContext.tsx";

const ProductDetail = () => {
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<number>(0);
  const [size, setSize] = useState<string>();

  const { pathname, state } = useLocation();

  const cartContext = useContext(CartContext);

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

  function onAddToCartHandler() {
    if (size !== undefined) {
      cartContext.addToCart(state, size);
    }
  }

  function onSizeClickHandler(event) {
    setSize(event.target.value);
  }

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 h-fit w-full pt-[2rem] max-lg:grid-cols-none max-lg:block">
          <div className="grid grid-cols-[1fr,6fr] gap-[0.5rem] w-full h-[65vh] max-lg:grid-cols-none max-lg:h-fit max-lg:justify-center max-lg:mb-[2rem]">
            <div className="flex flex-col gap-[0.5rem] h-4/5 w-full max-lg:row-start-2 max-lg:flex-row">
              {images.map((image, index) => {
                return (
                  <img
                    onClick={() => {
                      setMainImage(index);
                    }}
                    className="w-full h-[100px] border-2 border-gray-200 mr-auto hover:cursor-pointer max-lg:h-[60px] max-lg:w-[60px]"
                    src={image}
                    alt={image}
                  />
                );
              })}
            </div>
            <div className="h-4/5 w-full max-lg:row-start-1 max-lg:flex max-lg:justify-center max-lg:h-full">
              <img
                className="w-4/6 h-[50vh] border-2 border-gray-200 max-lg:w-full"
                src={images[mainImage]}
                alt={images[mainImage]}
              />
            </div>
          </div>
          <div className="grid grid-rows-[4fr,1fr] w-full h-full">
            <div className="inline-flex flex-col gap-[1rem] w-fit h-full border-b-2 border-gray-200 max-lg:pb-[1rem] max-lg:mr-[1rem] max-lg:w-full max-lg:text-center">
              <h1 className="text-2xl font-bold">{state.name}</h1>
              <h1 className="text-3xl font-bold">${state.price}</h1>
              <p className="text-sm text-gray-600 mb-[1rem] w-[40ch] max-lg:w-full">
                A lightweight, usually knitted, pullover shirt, close-fitting
                and with a round neckline and short sleeves, worn as an
                undershirt or outer garment.
              </p>
              <div className="w-full h-fit">
                <p className="text-sm font-bold mb-[1rem]">Select Size</p>
                {state.sizes.map((s) => {
                  return (
                    <button
                      value={s}
                      onClick={onSizeClickHandler}
                      className={`w-[50px] h-[50px] ${
                        s === size
                          ? "bg-slate-950 text-white"
                          : "bg-gray-300 text-black"
                      } mr-[0.5rem] rounded-sm hover:bg-slate-950 hover:text-white hover:rounded-sm`}
                    >
                      {(s === "Medium" && "M") ||
                        (s === "Large" && "L") ||
                        (s === "Extra Large" && "XL") ||
                        (s === "Small" && "S")}
                    </button>
                  );
                })}
              </div>
              <button
                className="bg-slate-950 text-white h-[40px] w-[150px] text-sm mt-[2rem] max-lg:justify-center max-lg:m-auto"
                onClick={onAddToCartHandler}
              >
                ADD TO CART
              </button>
            </div>
            <div className="w-full h-fit mt-[1rem] max-lg:text-center max-lg:pb-[2rem]">
              <p className="text-sm text-gray-400">100% Original product</p>
              <p className="text-sm text-gray-400">
                Cash on delivery is available on this product.
              </p>
              <p className="text-sm text-gray-400">
                Easy return and exchange policy within 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
