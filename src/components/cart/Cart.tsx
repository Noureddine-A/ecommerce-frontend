import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext.tsx";
import CartItem from "./CartItem.tsx";
import { Cart } from "../../types/Cart.ts";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<Cart>([]);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    let cart: Cart = [];

    for (const key in cartContext.cart) {
      console.log(cartContext.cart[key]);
    }
  }, [cartContext.cartCount]);

  return (
    <div className="w-full h-fit pt-[2rem]">
      <div className="flex items-center w-full h-[10vh]">
        <h1 className="text-2xl w-fit">
          YOUR <strong>CART</strong>
        </h1>
        <div className="flex items-center w-fit h-full ml-[0.5rem]">
          <div className="h-[2px] w-[50px] bg-slate-950"></div>
        </div>
      </div>
      <div className="flex w-full h-fit"></div>
    </div>
  );
};

export default CartPage;
