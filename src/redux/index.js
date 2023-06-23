import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./products/products"
import categoriesSlice from "./categories/categories"
import userSlice from "./user/user"
import {apiSlice} from "./api/api";

export const store = configureStore({
    reducer: {
        products : productsSlice,
        categories : categoriesSlice,
        user : userSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})