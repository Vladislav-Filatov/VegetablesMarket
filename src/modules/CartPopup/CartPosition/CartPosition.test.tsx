import {beforeEach, describe, expect} from "vitest";
import {CartContext} from "../../../context/CartContext.ts";
import {MantineProvider} from "@mantine/core";
import {render} from "@testing-library/react";
import {CartPosition} from "./CartPosition.tsx";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe('CartPosition', () => {
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Корректно рендерится информация о позиции', () => {
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
          <CartPosition
            id={1}
            image="src"
            name="Broccoli"
            price={10}
            count={3}
          />
        </CartContext.Provider>
      </MantineProvider>
    );

    expect(screen.getByAltText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('$ 10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('При нажатии на плюс вызывается incrementCartPosition с id товара', async () => {
    const user = userEvent.setup();
    const incrementCartPosition = vi.fn();
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart: vi.fn(),
            incrementCartPosition,
            decrementCartPosition: vi.fn(),
          }}
        >
          <CartPosition
            id={1}
            image="src"
            name="Broccoli"
            price={10}
            count={3}
          />
        </CartContext.Provider>
      </MantineProvider>
    );

    const plusButton = screen.getByRole('button', {name: 'plus-count'});
    await user.click(plusButton);

    expect(incrementCartPosition).toHaveBeenCalledTimes(1);
    expect(incrementCartPosition).toHaveBeenCalledWith(1);
  });

  it('При нажатии на минус вызывается decrementCartPosition с id товара', async () => {
    const user = userEvent.setup();
    const decrementCartPosition = vi.fn();
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition,
          }}
        >
          <CartPosition
            id={1}
            image="src"
            name="Broccoli"
            price={10}
            count={3}
          />
        </CartContext.Provider>
      </MantineProvider>
    );

    const minusButton = screen.getByRole('button', {name: 'minus-count'});
    await user.click(minusButton);

    expect(decrementCartPosition).toHaveBeenCalledTimes(1);
    expect(decrementCartPosition).toHaveBeenCalledWith(1);
  });

});