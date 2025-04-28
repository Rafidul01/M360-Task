import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product, ProductResponse } from "../types/product";

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
    }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;