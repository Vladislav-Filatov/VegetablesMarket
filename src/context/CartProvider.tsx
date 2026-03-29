import {type ReactNode, useState } from "react";
import {CartContext} from "./CartContext.ts";
import type {CartPositionInfo} from "./CartContext.ts";

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({children}: CartProviderProps) => {
  const [cartList, setCartList] = useState<CartPositionInfo[]>([]);

  const addToCart = (vegetable: CartPositionInfo) => {
    setCartList(prev => {
      const isAlreadyExists = prev.find((item) => item.id===vegetable.id)
      if (isAlreadyExists) {
        return prev.map(item => (
          item.id===vegetable.id
            ? {...item, count: item.count + vegetable.count}
            : item
        ))
      }
      return [...prev, vegetable];
    })
  };

  const incrementCartPosition = (id: number) => {
    setCartList(prev => (
      prev.map(item => (
        item.id===id
          ? {...item, count: item.count + 1}
          : item
      ))
    ))
  };

  const decrementCartPosition = (id: number) => {
    setCartList(prev => (
      prev
        .map(item => (
          item.id === id
            ? {...item, count: item.count - 1}
            : item
        ))
        .filter(item => item.count>0)
    ))
  }

  return (
    <CartContext.Provider value={{cartList, addToCart, incrementCartPosition, decrementCartPosition}}>
      {children}
    </CartContext.Provider>
  );
};
