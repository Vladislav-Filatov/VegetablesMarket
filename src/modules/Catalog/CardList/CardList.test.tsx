import {beforeAll, beforeEach, describe, expect} from "vitest";
import CardList from "./CardList.tsx";
import {getProducts} from "../api/GetProducts.ts";
import {screen} from "@testing-library/react";
import {renderWithStore} from "../../../test/renderWithStore.tsx";
vi.mock('../api/GetProducts.ts', () => (
  {
    getProducts: vi.fn()
  }
));

vi.mock('../VegetableCard/VegetableCard.tsx', () => (
  {
    VegetableCard: () => <div data-testid='vegetable-card' />,
  }
));
describe('CardList', () => {
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

  it('Показывает лоадер во время загрузки', () => {
    vi.mocked(getProducts).mockReturnValue(new Promise(() => {}));

    renderWithStore(<CardList/>, {
      cart: { cartList: [] },
      catalog: {products: [], isLoading: false, error: null },
    });

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('После загрузки корректно рендерит карточки', async () => {
    vi.mocked(getProducts).mockResolvedValue(
      [
        { id: 1, name: 'Broccoli - 1kg', image: 'src', price: 10 },
        { id: 2, name: 'Potato - 1kg', image: 'src', price: 5 },
      ]
    );

    renderWithStore(<CardList/>, {
      cart: { cartList: [] },
      catalog: {products: [], isLoading: false, error: null },
    });

    const cards = await screen.findAllByTestId('vegetable-card');

    expect(cards).toHaveLength(2);
  })

  it('При ошибке пропадает лоадер и пишется ошибка', async () => {
    vi.mocked(getProducts).mockRejectedValue(new Error('Ошибка'));

    renderWithStore(<CardList/>, {
      cart: { cartList: [] },
      catalog: {products: [], isLoading: false, error: null },
    });

    expect(await screen.findByText('Ошибка')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('vegetable-card')).not.toBeInTheDocument();
  });
})