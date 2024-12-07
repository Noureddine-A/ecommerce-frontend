import React, { useEffect, useState } from "react";

import { createContext } from "react";

import { Product } from "../../types/Product.ts";
import { Cart, CartItem } from "../../types/Cart.ts";

export const CartContext = createContext({
  cartCount: 0,
  cart: {},
  addToCart: (product: Product, size: string) => {},
  setCartAmount: () => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    setCartAmount();
  }, [cart]);

  function addToCart(product: Product, size: string) {
    console.log(cart);
    if (cart.length === 0) {
      setCart([{ product: product, sizes: [{ sizeName: size, quantity: 1 }] }]);
      setCartAmount();
    }

    let newCartItem: CartItem = null;
    const newCart = cart;
    let cartItemExists = false;

    cart.forEach((cartItem, index) => {
      if (cartItem?.product.name === product.name) {
        newCartItem = cartItem;
        cartItemExists = true;

        const found = newCartItem?.sizes.find((s, i) => {
          if (s.sizeName === size) {
            if (newCartItem !== null) {
              newCartItem.sizes[i].quantity += 1;
              return true;
            }
          }
          return false;
        });

        if (!found) {
          newCartItem.sizes.push({ sizeName: size, quantity: 1 });
          newCart[index] = newCartItem;

          setCart(newCart);
          setCartAmount();
        }
      }
      setCartAmount();
    });

    if (!cartItemExists && cart.length > 0) {
      setCart((prevCart) => {
        return [
          ...prevCart,
          { product: product, sizes: [{ sizeName: size, quantity: 1 }] },
        ];
      });

      setCartAmount();
    }
  }

  function setCartAmount() {
    let count: number = 0;

    cart.forEach((cartItem) => {
      cartItem?.sizes.forEach((size) => {
        count += size.quantity;
      });
    });

    setCartCount(count);
  }

  const ctxValue = {
    cart: cart,
    cartCount: cartCount,
    addToCart,
    setCartAmount,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
