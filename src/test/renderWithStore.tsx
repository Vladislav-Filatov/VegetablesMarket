import {configureStore} from "@reduxjs/toolkit";
import cartReducer from '../store/cartSlice.tsx';
import catalogReducer from '../store/catalogSlice.tsx';
import type {RootState} from "../store/store.ts";
import type {ReactNode} from "react";
import {render} from "@testing-library/react";
import {Provider} from "react-redux";
import {MantineProvider} from "@mantine/core";

export const createTestStore = (preloadedState?:RootState) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
      catalog: catalogReducer,
    },
    preloadedState,
  });
};

export const renderWithStore = (ui: ReactNode, preloadedState?: RootState) => {
  const store = createTestStore(preloadedState);

  return {
    store,
    ...render(
      <Provider store={store}>
        <MantineProvider>
          {ui}
        </MantineProvider>
      </Provider>
    )
  }
};