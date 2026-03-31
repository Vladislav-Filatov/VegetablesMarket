import type {CartPositionInfo} from "./CartContext.ts";

export const addProductToCart = (prev:CartPositionInfo[] ,vegetable: CartPositionInfo) => {
  const isAlreadyExists = prev.find((item) => item.id===vegetable.id)
  if (isAlreadyExists) {
    return prev.map(item => (
      item.id===vegetable.id
        ? {...item, count: item.count + vegetable.count}
        : item
    ))
  }
  return [...prev, vegetable];
}

export const increment = (prev: CartPositionInfo[], id: number) => {
    return prev.map(item => (
      item.id===id
        ? {...item, count: item.count + 1}
        : item
    ))
};

export const decrement = (prev: CartPositionInfo[], id: number) => {
    return prev
      .map(item => (
        item.id === id
          ? {...item, count: item.count - 1}
          : item
      ))
      .filter(item => item.count>0)
};