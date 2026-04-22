import {describe, expect} from "vitest";
import { screen } from "@testing-library/react";
import {VegetableCard} from "./VegetableCard.tsx";
import userEvent from "@testing-library/user-event";
import {renderWithStore} from "../../../test/renderWithStore.tsx";

describe('VegetableCard', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  });

  it('Количество в счетчике увеличивается при нажатии на плюс', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <VegetableCard
        id={1}
        name="Broccoli"
        price={10}
        image="src"
      />,
      {
        cart: { cartList: [] },
        catalog: {products: [], isLoading: false, error: null },
      }
    );

    const plusButton = screen.getByRole('button', {name: 'plus-count'});
    const counter = screen.getByTestId('product-count');

    await user.click(plusButton);
    await user.click(plusButton);

    expect(counter).toHaveTextContent('3');
  });

  it('Количество в счетчике уменьшается при нажатии на минус', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <VegetableCard
        id={1}
        name="Broccoli"
        price={10}
        image="src"
      />,
      {
        cart: { cartList: [] },
        catalog: {products: [], isLoading: false, error: null },
      }
    );

    const plusButton = screen.getByRole('button', {name: 'plus-count'});
    const minusButton = screen.getByRole('button', {name: 'minus-count'});
    const counter = screen.getByTestId('product-count');

    await user.click(plusButton);
    await user.click(plusButton);
    await user.click(minusButton);


    expect(counter).toHaveTextContent('2');
  });

  it('Количество товаров не может стать отрицательным', async () => {
    const user = userEvent.setup();
    renderWithStore(
      <VegetableCard
        id={1}
        name="Broccoli"
        price={10}
        image="src"
      />,
      {
        cart: { cartList: [] },
        catalog: {products: [], isLoading: false, error: null },
      }
    );

    const minusButton = screen.getByRole('button', {name: 'minus-count'});
    const counter = screen.getByTestId('product-count');

    await user.click(minusButton);
    await user.click(minusButton);

    expect(counter).toHaveTextContent('1');
  })

  it('Корректно передается информация о товаре при добавлении в корзину', async () => {
    const user = userEvent.setup();
    const {store} = renderWithStore(
      <VegetableCard
        id={1}
        name="Broccoli"
        price={10}
        image="src"
      />,
      {
        cart: { cartList: [] },
        catalog: {products: [], isLoading: false, error: null },
      }
    );

    const addToCartButton = screen.getByRole('button', {name: /add to cart/i});
    const plusButton = screen.getByRole('button', {name: 'plus-count'});

    await user.click(plusButton);
    await user.click(addToCartButton);

    expect(store.getState().cart.cartList).toEqual([{
      id: 1,
      name: "Broccoli",
      price: 10,
      image: "src",
      count: 2,
    }]);
  });
});