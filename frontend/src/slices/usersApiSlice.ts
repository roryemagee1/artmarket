import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice"

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      })
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data
      })
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data
      })
    }),
  //   getUserProfile: builder.query({
  //     query: () => ({
  //       url: USERS_URL,
  //     }),
  //     keepUnusedDataFor: 5,
  //   }),
  //   updateUserProfile: builder.query({
  //     query: (id) => ({
  //       url: `${USERS_URL}/${id}`
  //     }),
  //     keepUnusedDataFor: 5,
  //   })
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, /*useGetUserProfileQuery, useUpdateUserProfileQuery*/ } = usersApiSlice;