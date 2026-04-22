import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface CartPositionInfo extends CardInfo{
  count: number
}

interface CartState {
  cartList: CartPositionInfo[];
}

const initialState: CartState = {
  cartList: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartPositionInfo>) => {
      const exciting = state.cartList.find((item) => item.id===action.payload.id);
      if (exciting) {
        exciting.count += action.payload.count;
        return;
      }
      state.cartList.push(action.payload);
    },

    incrementCartPosition: (state, action: PayloadAction<{ id: number }>) => {
      const exciting = state.cartList.find((item) => item.id===action.payload.id);
      if (exciting) {
        exciting.count += 1;
      }
    },

    decrementCartPosition: (state, action: PayloadAction<{ id: number }>) => {
      const exciting = state.cartList.find((item) => item.id===action.payload.id);
      if (!exciting) return;
      exciting.count -= 1;
      state.cartList = state.cartList.filter(item => item.count > 0);
    },
  }
});

export const {addToCart, incrementCartPosition, decrementCartPosition} = cartSlice.actions;
export default cartSlice.reducer;