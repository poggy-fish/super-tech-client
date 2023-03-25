import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //
    getAllProducts: builder.query({
      query: ({ page, sort, limit, minPriceValue, initialMaxPrice }) => ({
        url: `/api/v1/product?page=${page}&limit=${limit}&sort=${sort}`,
      }),
    }),
    getProduct: builder.query({
      query: (id) => `/api/v1/product/${id}`,
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/api/v1/product",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useAddProductMutation,
} = productsApi;