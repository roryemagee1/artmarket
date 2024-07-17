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
      query: ({ id, data }) => ({
        url: `${ORDERS_URL}/${id}/pay`,
        method: "PUT",
        body: data
      }),
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: ({ id }) => ({
        url: `${ORDERS_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetMyOrdersQuery, 
  useGetOrderByIdQuery, 
  usePayOrderMutation, 
  useGetPayPalClientIdQuery,
  useGetOrdersQuery,
  useDeliverOrderMutation, 
} = ordersApiSlice;