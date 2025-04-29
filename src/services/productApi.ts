import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Category, Product, ProductResponse } from "../types/product";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://dummyjson.com",
    }),
    endpoints: (builder) => ({
        getProducts: builder.query<ProductResponse, { limit: number; skip: number }>({
            query: ({ limit, skip }) => `/products?limit=${limit}&skip=${skip}`,
        }),
        getProductById: builder.query<Product, number>({
            query: (id) => `/products/${id}`,
        }),
        patchProduct: builder.mutation({
            query: ({ id, body }) => ({
              url: `/products/${id}`,
              method: "PATCH",
              body,
            }),
        }),
        getCategories: builder.query<Category[], void>({
            query: () => `/products/categories`,
        }),
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery, usePatchProductMutation, useGetCategoriesQuery } = productApi;