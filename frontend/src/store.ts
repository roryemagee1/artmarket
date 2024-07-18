import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@src/slices/apiSlice';
import cartSliceReducer from '@src/slices/cartSlice';
import authSliceReducer from '@src/slices/authSlice';

const store = configureStore({ 
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: false,
  // devTools: process.env.NODE_ENV !== "production",
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch