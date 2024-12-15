import React, { useEffect, useState } from "react";

import { createContext } from "react";

import { Product } from "../../types/Product.ts";
import { Cart, CartItem } from "../../types/Cart.ts";

export const CartContext = createContext({
  cart: [],
  cartCount: 0,
  addToCart: (product: Product, size: string) => {},
  setCartAmount: () => {},
  deleteFromCart: (productId: number | undefined, size: string) => {},
  changeQuantity: (
    quantity: number,
    productId: number | undefined,
    size: string
  ) => {},
});

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);
  const [cartCount, setCartCount] = useState<number>(0);

  console.log(cart);

  useEffect(() => {
    setCartAmount();
  }, [cart]);

  function addToCart(product: Product, size: string) {
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

  function deleteFromCart(productId: number | undefined, size: string) {
    const newCart = cart.filter((cartItem) => {
      let newSizesList;

      if (cartItem?.product.id === productId) {
        newSizesList = cartItem?.sizes.filter((s) => {
          return s.sizeName !== size;
        });
        if (cartItem !== null) {
          cartItem.sizes = newSizesList;
        }
      }

      return cartItem?.sizes.length !== 0;
    });

    setCart(newCart);
  }

  function changeQuantity(
    quantity: number,
    productId: number | undefined,
    size: string
  ) {
    const newCart = cart.map((cartItem) => {
      let newSizeList;

      if (cartItem?.product.id === productId) {
        newSizeList = cartItem?.sizes.map((s) => {
          if (s.sizeName === size) {
            s.quantity = quantity;
            return s;
          } else {
            return s;
          }
        });
        if (cartItem !== null) {
          cartItem.sizes = newSizeList;
        }
      }

      return cartItem;
    });

    setCartAmount();
    setCart(newCart);
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
    deleteFromCart,
    changeQuantity,
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
};

export default CartContextProvider;
