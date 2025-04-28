import {configureStore} from "@reduxjs/toolkit";  
import {setupListeners} from "@reduxjs/toolkit/query";
import { productApi } from "./services/productApi";

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [productApi.reducerPath]: productApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productApi.middleware),
});

setupListeners(store.dispatch);