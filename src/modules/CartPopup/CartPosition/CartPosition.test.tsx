import {beforeEach, describe, expect} from "vitest";
import {CartPosition} from "./CartPosition.tsx";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {renderWithStore} from "../../../test/renderWithStore.tsx";

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
    renderWithStore(
      <CartPosition
        id={1}
        image="src"
        name="Broccoli"
        price={10}
        count={3}
      />,
      {
        cart: {cartList: []},
        catalog: { products: [], isLoading: false, error: null },
      }
    );

    expect(screen.getByAltText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('Broccoli')).toBeInTheDocument();
    expect(screen.getByText('$ 10')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('При нажатии на плюс вызывается incrementCartPosition с id товара', async () => {
    const user = userEvent.setup();
    const {store} = renderWithStore(
      <CartPosition
        id={1}
        image="src"
        name="Broccoli"
        price={10}
        count={3}
      />,
      {
        cart: {cartList: [
          { id: 1, image: 'src', name: 'Broccoli - 1kg', price: 10, count: 2 },
        ]},
        catalog: { products: [], isLoading: false, error: null },
      }
    );

    const plusButton = screen.getByRole('button', {name: 'plus-count'});
    await user.click(plusButton);

    expect(store.getState().cart.cartList[0].count).toBe(3);
  });

  it('При нажатии на минус вызывается decrementCartPosition с id товара', async () => {
    const user = userEvent.setup();
    const {store} = renderWithStore(
      <CartPosition
        id={1}
        image="src"
        name="Broccoli"
        price={10}
        count={3}
      />,
      {
        cart: {cartList: [
            { id: 1, image: 'src', name: 'Broccoli - 1kg', price: 10, count: 2 },
          ]},
        catalog: { products: [], isLoading: false, error: null },
      }
    );

    const minusButton = screen.getByRole('button', {name: 'minus-count'});
    await user.click(minusButton);

    expect(store.getState().cart.cartList[0].count).toBe(1);
  });
});