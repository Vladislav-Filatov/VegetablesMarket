import {describe, expect} from "vitest";
import {addProductToCart, decrement, increment} from "./cart.utils.ts";
import type {CartPositionInfo} from "./CartContext.ts";

const broccoli: CartPositionInfo = {
  id: 1,
  name: 'Broccoli',
  image: 'src',
  price: 10,
  count: 1,
};

const cucumber: CartPositionInfo = {
  id: 2,
  name: 'Cucumber',
  image: 'src',
  price: 20,
  count: 2,
};

describe('cart utils', () => {
  it('addProductToCart добавляет товар в пустую корзину', () => {
    const result = addProductToCart([], broccoli);
    expect(result).toEqual([broccoli]);
  });

  it('addProductToCart добавляет новый товар в корзину, если такого id еще нет', () => {
    const result = addProductToCart([broccoli], cucumber);

    expect(result).toEqual([broccoli, cucumber]);
  });

  it('addProductToCart увеличивает count, если такой id уже есть', () => {
    const result = addProductToCart([cucumber], cucumber);

    expect(result).toEqual([{...cucumber, count: 4}])
  });

  it('increment увеличивает count на 1', () => {
    const result  = increment([broccoli, cucumber], 1);
    expect(result).toEqual([{...broccoli, count: 2}, cucumber]);
  });

  it('decrement уменьшает count на 1', () => {
    const result = (decrement([broccoli, cucumber], 2));
    expect(result).toEqual([broccoli, {...cucumber, count: 1}])
  })

  it('decrement удаляет элемент из корзины, если count был 1', () => {
    const result = decrement([broccoli], 1);
    expect(result).toEqual([]);
  });

})