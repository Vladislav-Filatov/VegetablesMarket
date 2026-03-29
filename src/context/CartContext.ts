import {createContext} from "react";
import type {CardInfo} from "../types/cardTypes.ts";

export interface CartPositionInfo extends CardInfo{
  count: number
}

interface CartContextType {
  cartList: CartPositionInfo[]
  addToCart: (vegetable: CartPositionInfo) => void
}

export const CartContext = createContext<CartContextType | null>(null);