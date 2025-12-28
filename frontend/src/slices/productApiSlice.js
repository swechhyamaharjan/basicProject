import { apiSlice } from "./apiSlice";
import { PRODUCT_URL } from "../constants";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Product"],
    }),
    addProduct: builder.mutation({
      query: () => ({
        url: PRODUCT_URL,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data._id}`,
        body: data,
        method: "PUT",
      }),
      invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        body: data,
        method: "POST",
      })
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productApiSlice;