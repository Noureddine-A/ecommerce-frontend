import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/CartContext.tsx";
import CartItemPage from "./CartItem.tsx";
import { Cart, CartItem } from "../../types/Cart.ts";
import { useNavigate } from "react-router-dom";

type CartList = {
  cartItem: CartItem;
  size: { sizeName: string; quantity: number };
}[];

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartList>([]);

  const navigate = useNavigate();

  const cartContext = useContext(CartContext);

  useEffect(() => {
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

  function onNavigateToPlaceOrderHandler() {
    navigate("/place-order", {
      state: {
        cart: cartContext.cart,
        price: cartContext.calculateCartPrice() + 10,
      },
    });
  }

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
          return (
            <CartItemPage
              key={index}
              cartItem={cartItem}
              size={cartItem.size}
            />
          );
        })}
      </div>
      <div className="flex justify-end w-full h-[40vh] max-sm:justify-center">
        <div className="w-2/5 h-full max-sm:w-4/5">
          <div className="flex items-center w-full h-1/5">
            <h1 className="text-2xl">
              CART <strong>TOTALS</strong>
            </h1>
            <div className="flex items-center w-fit h-full ml-[0.5rem]">
              <div className="h-[2px] w-[50px] bg-slate-950" />
            </div>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200">
            <h2 className="basis-3/4">Subtotal</h2>
            <h2 className="basis-1/4">$ {cartContext.calculateCartPrice()}</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200">
            <h2 className="basis-3/4">Shipping Fee</h2>
            <h2 className="basis-1/4">$ 10</h2>
          </div>
          <div className="flex w-full h-fit py-[1rem] border-b-2 gray-200 font-bold">
            <h2 className="basis-3/4">Total</h2>
            <h2 className="basis-1/4">
              $ {cartContext.calculateCartPrice() + 10}
            </h2>
          </div>
          <div className="flex justify-end w-full h-fit">
            <button
              onClick={onNavigateToPlaceOrderHandler}
              className="bg-slate-950 w-1/2 my-[2rem] p-3 text-white max-xl:w-full"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
