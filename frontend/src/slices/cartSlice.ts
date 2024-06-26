import { createSlice } from '@reduxjs/toolkit';
import { IProductKeys } from '@src/types/interfaces'

import { updateCart } from '@src/utils/cartUtils'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : { cartItems: [] };

const addDecimals = (num: number): string => {
  return (Math.round(num * 100) /100).toFixed(2);
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((product: IProductKeys) => product._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((product: IProductKeys) => product._id === existItem._id ? item : product )
      } else {
        state.cartItems = [ ...state.cartItems, item];
      }

      return updateCart(state);
    }
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;