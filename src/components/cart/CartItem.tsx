import React, { useContext, useEffect, useState } from "react";
import { CartItem } from "../../types/Cart";
import { base64ToImage } from "../util/util.ts";

import Delete from "../../assets/images/bin_icon.png";
import { CartContext } from "../store/CartContext.tsx";

type CartProduct = {
  cartItem: CartItem;
  size: { sizeName: string; quantity: number };
};

const CartItemPage: React.FC<{ cartItem: CartProduct; size: {} }> = (props) => {
  const [image, setImage] = useState<string>();

  const cartContext = useContext(CartContext);

  useEffect(() => {
    setImage(base64ToImage(props.cartItem.cartItem?.product.images[0]));
  }, [props]);

  function onDeleteProductFromCartHandler() {
    cartContext.deleteFromCart(
      props.cartItem?.cartItem?.product.id,
      props.cartItem?.size.sizeName
    );
  }

  function onChangeAmountHandler(event) {
    if (event.target.value !== "") {
      cartContext.changeQuantity(
        Number(event.target.value),
        props.cartItem?.cartItem?.product.id,
        props.cartItem?.size.sizeName
      );
    }
  }

  return (
    <div className="flex w-full h-[25vh] border-t-2 border-gray-200 py-[1rem] pr-[1rem]">
      <div className="w-1/5 h-full max-sm:hidden">
        <img
          className="w-3/5 h-full max-xl:w-full max-"
          src={image}
          alt={image}
        />
      </div>
      <div className="w-2/5 h-full pl-[1rem] max-sm:w-3/5">
        <h2 className="font-bold mb-[1rem] max-sm:w-[15ch]">
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
        <h1 className="w-full h-1/5 font-bold max-sm:flex max-sm:justify-center">
          Amount
        </h1>
        <div className="flex items-center w-full h-4/5 max-sm:justify-center">
          <input
            type="number"
            placeholder={String(props.cartItem?.size.quantity)}
            className="h-[40px] w-[40px] border-2 border-slate-950 px-[0.5rem]"
            onChange={onChangeAmountHandler}
          />
        </div>
      </div>
      <div className="w-1/5 h-full">
        <div className="w-full h-1/5" />
        <div className="flex justify-center items-center w-full h-4/5">
          <img
            className="w-[25px] h-[25px] hover:cursor-pointer"
            src={Delete}
            alt={Delete}
            onClick={onDeleteProductFromCartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemPage;
