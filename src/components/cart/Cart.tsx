import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext.tsx";
import CartItemPage from "./CartItem.tsx";
import { Cart, CartItem } from "../../types/Cart.ts";

type CartList = {
  cartItem: CartItem;
  size: { sizeName: string; quantity: number };
}[];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartList>([]);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    let cart: Cart = [];

    let cartList: CartList = [];

    cartContext.cart.forEach((cartItem: CartItem) => {
      cartItem?.sizes.forEach((size) => {
        cartList.push({
          cartItem: cartItem,
          size: { sizeName: size.sizeName, quantity: size.quantity },
        });
      });
    });

    setCartItems(cartList);
  }, [cartContext.cartCount]);

  return (
    <div className="w-full h-fit pt-[2rem]">
      <div className="flex items-center w-full h-[10vh]">
        <h1 className="text-2xl w-fit">
          YOUR <strong>CART</strong>
        </h1>
        <div className="flex items-center w-fit h-full ml-[0.5rem]">
          <div className="h-[2px] w-[50px] bg-slate-950" />
        </div>
      </div>
      <div className="grid gap-[1rem] w-full h-fit">
        {cartItems.map((cartItem, index) => {
         return <CartItemPage key={index} cartItem={cartItem} size={cartItem.size}/>
        })}
      </div>
    </div>
  );
};

export default CartPage;
