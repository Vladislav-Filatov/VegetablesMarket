import {type ReactNode, useState } from "react";
import {CartContext} from "./CartContext.ts";
import type {CartPositionInfo} from "./CartContext.ts";
import {addProductToCart, increment, decrement} from "./cart.utils.ts";

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({children}: CartProviderProps) => {
  const [cartList, setCartList] = useState<CartPositionInfo[]>([]);

  const addToCart = (vegetable: CartPositionInfo) => {
    setCartList(prev => addProductToCart(prev, vegetable));
  };

  const incrementCartPosition = (id: number) => {
    setCartList(prev => increment(prev, id));
  };

  const decrementCartPosition = (id: number) => {
    setCartList(prev => decrement(prev, id));
  }

  return (
    <CartContext.Provider value={{cartList, addToCart, incrementCartPosition, decrementCartPosition}}>
      {children}
    </CartContext.Provider>
  );
};
