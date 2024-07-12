import { PRODUCTS_URL, /*UPLOAD_URL*/ } from "../constants";
import { apiSlice } from "./apiSlice"

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      providesTags: ["Product"],
      keepUnusedDataFor: 5,
    }),
    getProductsDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST"
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.id}`,
        method: "PUT",
        body: { ...data }
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data
      })
    })
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductsDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;