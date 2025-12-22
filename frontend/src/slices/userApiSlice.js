import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
     updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/updateprofile`,
        method: "PUT",
        body: data,
      })
     }),
     register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      })
     })
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdateProfileMutation, useRegisterMutation } = userApiSlice;