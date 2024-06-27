import { createSlice } from '@reduxjs/toolkit';
import { IProductKeys } from '@src/types/interfaces'

import { updateCart } from '@src/utils/cartUtils'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")!) : { cartItems: [] };

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
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((product: IProductKeys) => product._id !== action.payload);
      return updateCart(state);
    }
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;