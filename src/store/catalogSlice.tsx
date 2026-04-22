import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProducts} from "../modules/Catalog/api/GetProducts.ts";

interface catalogState {
  products: CardInfo[]
  isLoading: boolean
  error: string | null
}

const initialState: catalogState = {
  products: [],
  isLoading: false,
  error: null,
}

export const fetchProducts = createAsyncThunk<CardInfo[], undefined, {rejectValue: string}>(
  'catalog/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await getProducts();
    } catch(error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Неизвестная ошибка при попытке загрузить список продуктов');
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload ?? 'Неизвестаная ошибка';
        state.isLoading = false;
      })
  }
});

export default catalogSlice.reducer;