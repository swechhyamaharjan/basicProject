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
    getEsewa: builder.query({
      query: (orderId)=>({
        url: `${ORDER_URL}/getesewaformdata/${orderId}`,
      })
    }),
    getMyOrders: builder.query({
      query: ()=> ({
        url: `${ORDER_URL}/myorder`
      }),
      keepUnusedDataFor: 5,
    })
  }),
})

export const { usePlaceOrderMutation, useGetOrderDetailsQuery, useGetEsewaQuery, useGetMyOrdersQuery } = orderApiSlice;
