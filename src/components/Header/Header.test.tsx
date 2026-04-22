import { describe, expect } from "vitest";
import {renderWithStore} from "../../test/renderWithStore.tsx";
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

  it ('Корректно рендерится название страницы и кнопка корзизны', () => {
    renderWithStore(<Header/>, {
      cart: {cartList: []},
      catalog: { products: [], isLoading: false, error: null },
    });

    expect(screen.getByText('Vegetable')).toBeInTheDocument();
    expect(screen.getByText('SHOP')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Cart'})).toBeInTheDocument();
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('При наличии товаров в корзине корректно отображается их кол-во', () => {
    renderWithStore(<Header/>, {
      cart: {cartList: [{ id: 1, name: 'Broccoli', price: 10, image: 'src', count: 1 }]},
      catalog: { products: [], isLoading: false, error: null },
    });

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('При нажатии на кнопку корзины открывается попап ', async () => {
    const user = userEvent.setup();
    renderWithStore(<Header/>, {
      cart: {cartList: []},
      catalog: { products: [], isLoading: false, error: null },
    });

    const cartButton = screen.getByRole('button', {name: 'Cart'})
    await user.click(cartButton);
    expect(await screen.findByTestId('cart-popup')).toBeInTheDocument();
  });
})