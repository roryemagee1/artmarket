import { createSlice } from '@reduxjs/toolkit';

const initialState = (localStorage.getItem("userInfo") !== null) ? { userInfo: JSON.parse(localStorage.getItem("userInfo")!) } : { userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload))
    },
    removeCredentials: (state) => {
      state.userInfo = null;
      localStorage.clear();
      localStorage.setItem("userInfo", JSON.stringify(null));
    },
  },
});

export const { setCredentials, removeCredentials } = authSlice.actions;

export default authSlice.reducer;