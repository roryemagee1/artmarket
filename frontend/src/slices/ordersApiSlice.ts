import { ORDERS_URL, PAYPAL_URL } from '@src/constants';
import { apiSlice } from '@src/slices/apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDERS_URL}`,
        method: "POST",
        body: { ...order },
      })
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    payOrder: builder.mutation({
      query: ({ id, details }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
        body: { ...details }
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetMyOrdersQuery, 
  useGetOrderByIdQuery, 
  usePayOrderMutation, 
  useGetPayPalClientIdQuery 
} = ordersApiSlice;