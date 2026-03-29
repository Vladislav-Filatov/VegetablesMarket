import {type ReactNode, useState,  useEffect} from "react";
import {CartContext} from "./CartContext.ts";
import type {CartPositionInfo} from "./CartContext.ts";

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({children}: CartProviderProps) => {
  const [cartList, setCartList] = useState<CartPositionInfo[]>([]);

  const addToCart = (vegetable: CartPositionInfo) => {
    setCartList((prev) => {
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
  useEffect(() => {
    console.log(cartList);
  }, [cartList]);

  return (
    <CartContext.Provider value={{cartList, addToCart}}>
      {children}
    </CartContext.Provider>
  );
};
