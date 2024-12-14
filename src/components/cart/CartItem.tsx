import React, { useEffect, useState } from "react";
import { CartItem } from "../../types/Cart";
import { base64ToImage } from "../util/util.ts";

type CartProduct = {
  cartItem: CartItem;
  size: { sizeName: string; quantity: number };
};

const CartItemPage: React.FC<{ cartItem: CartProduct; size: {} }> = (props) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    setImage(base64ToImage(props.cartItem.cartItem?.product.images[0]));
  }, [props]);

  return (
    <div className="flex w-full h-[20vh] border-t-2 border-gray-200 py-[1rem] pr-[1rem]">
      <div className="w-1/5 h-full">
        <img className="w-3/5 h-full" src={image} alt={image} />
      </div>
      <div className="w-2/5 h-full">
        <h2 className="font-bold mb-[1rem]">
          {props.cartItem?.cartItem?.product.name}
        </h2>
        <div className="flex gap-[1rem] items-center w-full h-1/3">
          <p>${props.cartItem?.cartItem?.product.price}</p>
          <div className="flex justify-center items-center w-[40px] h-4/5 bg-gray-200 rounded-md">
            {(props.cartItem?.size.sizeName === "Medium" && " M") ||
              (props.cartItem?.size.sizeName === "Large" && "L") ||
              (props.cartItem?.size.sizeName === "Small" && "S") ||
              (props.cartItem?.size.sizeName === "Extra Large" && "XL")}
          </div>
        </div>
      </div>
      <div className="w-1/5 h-full">
        <h1 className="w-full h-1/5 font-bold">Amount</h1>
        <div className="flex items-center w-full h-2/5">
          {props.cartItem?.size.quantity}
        </div>
      </div>
    </div>
  );
};

export default CartItemPage;
