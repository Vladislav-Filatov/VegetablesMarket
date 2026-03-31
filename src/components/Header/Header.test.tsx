import { describe, expect } from "vitest";
import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { CartContext } from "../../context/CartContext.ts";
import Header from "./Header.tsx";
import { screen } from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

vi.mock('../../modules/CartPopup', () => (
  {
    CartPopup: () => <div data-testid="cart-popup">Корзина</div>,
  }
));

describe('Header', () => {
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

  it ('Корректно рендерится название страницы и кнопку корзизны', () => {
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
          <Header/>
        </CartContext.Provider>
      </MantineProvider>
    );

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cart'})).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('При наличии товаров в корзине корректно отображается их кол-во', () => {
    render(
      <MantineProvider>
        <CartContext.Provider
          value={{
            cartList: [{ id: 1, name: 'Broccoli', price: 10, image: 'src', count: 1 }],
            addToCart: vi.fn(),
            incrementCartPosition: vi.fn(),
            decrementCartPosition: vi.fn(),
          }}
        >
          <Header/>
        </CartContext.Provider>
      </MantineProvider>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('При нажатии на кнопку корзины открывается попап ', async () => {
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
          <Header/>
        </CartContext.Provider>
      </MantineProvider>
    );

    const cartButton = screen.getByRole('button', {name: 'Cart'})
    await user.click(cartButton);
    expect(await screen.findByTestId('cart-popup')).toBeInTheDocument();
  });
})