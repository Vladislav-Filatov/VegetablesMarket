import {describe, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import {CartContext} from "../../../context/CartContext.ts";
import {VegetableCard} from "./VegetableCard.tsx";
import userEvent from "@testing-library/user-event";
import {MantineProvider} from "@mantine/core";

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
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <VegetableCard
            id={1}
            name="Broccoli"
            price={10}
            image="src"
          />
        </CartContext.Provider>
      </MantineProvider>,
    );

    const plusButton = screen.getByRole('button', {name: 'plus-count'});
    const counter = screen.getByTestId('product-count');

    await user.click(plusButton);
    await user.click(plusButton);

    expect(counter).toHaveTextContent('3');
  });

  it('Количество в счетчике уменьшается при нажатии на минус', async () => {
    const user = userEvent.setup();
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <VegetableCard
            id={1}
            name="Broccoli"
            price={10}
            image="src"
          />
        </CartContext.Provider>
      </MantineProvider>,
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
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <VegetableCard
            id={1}
            name="Broccoli"
            price={10}
            image="src"
          />
        </CartContext.Provider>
      </MantineProvider>,
    )

    const minusButton = screen.getByRole('button', {name: 'minus-count'});
    const counter = screen.getByTestId('product-count');

    await user.click(minusButton);
    await user.click(minusButton);

    expect(counter).toHaveTextContent('1');
  })

  it('Корректно передается информация о товаре при добавлении в корзину', async () => {
    const user = userEvent.setup();
    const addToCart = vi.fn();
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart,
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <VegetableCard
            id={1}
            name="Broccoli"
            price={10}
            image="src"
          />
        </CartContext.Provider>
      </MantineProvider>,
    )

    const addToCartButton = screen.getByRole('button', {name: /add to cart/i});
    const plusButton = screen.getByRole('button', {name: 'plus-count'});

    await user.click(plusButton);
    await user.click(addToCartButton);

    expect(addToCart).toHaveBeenCalledWith({
      id: 1,
      name: "Broccoli",
      price: 10,
      image: "src",
      count: 2,
    });
  });
});