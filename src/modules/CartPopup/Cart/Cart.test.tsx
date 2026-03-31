import {describe, expect} from "vitest";
import {CartPopup} from "../index.ts";
import {CartContext} from "../../../context/CartContext.ts";
import {render} from "@testing-library/react";
import {MantineProvider} from "@mantine/core";
import {screen} from "@testing-library/react";

vi.mock('../CartPosition/CartPosition.tsx', () => (
  {
    CartPosition: () => <div data-testid="cart-position"/>,
  }
))

describe('Cart', () => {
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

  it('Корректно отображается пустая корзина', () => {
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
          <CartPopup />
        </CartContext.Provider>
      </MantineProvider>
    );

    expect(screen.getByAltText('Корзина пуста')).toBeInTheDocument();
    expect(screen.getByText('Ваша корзина пока пуста')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-position')).not.toBeInTheDocument();
  });

  it('Корректно отображается, если в cartList есть товары', () => {
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [
              { id: 1, name: 'Broccoli', price: 10, image: 'src', count: 1 },
              { id: 2, name: 'Carrot', price: 20, image: 'src', count: 2 }
            ],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <CartPopup />
        </CartContext.Provider>
      </MantineProvider>
    );

    const cartPositions = screen.getAllByTestId('cart-position')

    expect(cartPositions).toHaveLength(2);
    expect(screen.queryByText('Ваша корзина пока пуста')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Корзина пуста')).not.toBeInTheDocument();
  });

  it('Корректно считается общая сумма корзины', () => {
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [
              { id: 1, name: 'Broccoli', price: 10, image: 'src', count: 1 },
              { id: 2, name: 'Carrot', price: 20, image: 'src', count: 2 }
            ],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <CartPopup />
        </CartContext.Provider>
      </MantineProvider>
    );

    expect(screen.getByText('$ 50')).toBeInTheDocument();
  });

});