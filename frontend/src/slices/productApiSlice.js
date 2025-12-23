import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL
      }),
      keepUnusedDataFor: 5, //caching 
      providesTags: ["Product"]
    }),
    getProductsById: builder.query({
      query: (id)=>({
        url: `${PRODUCT_URL}/${id}`
      }),
      keepUnusedDataFor: 5,
    }),
    addProduct: builder.mutation({
      query: ()=>({ //data not neeeded because sample bata aucha
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"]
    }),
    deleteProduct: builder.mutation({
      query: (id)=>({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    })
  })
})
export const {useGetProductsQuery, useGetProductsByIdQuery, useAddProductMutation, useDeleteProductMutation} = productApiSlice;
