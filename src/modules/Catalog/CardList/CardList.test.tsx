import {beforeAll, beforeEach, describe, expect} from "vitest";
import CardList from "./CardList.tsx";
import {getProducts} from "../api/GetProducts.ts";
import {render} from "@testing-library/react";
import {screen} from "@testing-library/react";
import {MantineProvider} from "@mantine/core";
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

    render(
      <MantineProvider>
        <CardList/>
      </MantineProvider>
    )

    expect(screen.getByText('Catalog')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('После загрузки корректно рендерит карточки', async () => {
    vi.mocked(getProducts).mockResolvedValue(
      [
        { id: 1 },
        { id: 2 },
      ]
    );

    render(
      <MantineProvider>
        <CardList/>
      </MantineProvider>
    )

    const cards = await screen.findAllByTestId('vegetable-card');

    expect(cards).toHaveLength(2);
  })

  it('При ошибке пропадает лоадер и пишется ошибка', async () => {
    vi.mocked(getProducts).mockRejectedValue(new Error('Ошибка'));

    render(
      <MantineProvider>
        <CardList/>
      </MantineProvider>
    )

    expect(await screen.findByText('Ошибка')).toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    expect(screen.queryByTestId('vegetable-card')).not.toBeInTheDocument();
  });
})