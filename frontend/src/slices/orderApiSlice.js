import { ORDER_URL } from "../constants";
import {apiSlice} from "../slices/apiSlice";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    placeOrder: builder.mutation({
      query: (order)=>({
        url: ORDER_URL,
        method: "POST",
        body: {...order}
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId)=>({
        url: `${ORDER_URL}/${orderId}`
      }), 
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { usePlaceOrderMutation, useGetOrderDetailsQuery } = orderApiSlice;
