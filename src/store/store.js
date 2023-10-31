import { configureStore } from "@reduxjs/toolkit";
import calculateReducer from "./calculateSlice"
import compareReducer from "./compareSlice"
import { currenciesApi } from "./apis/currenciesApi";


export const store = configureStore({
    reducer: {
        calculate: calculateReducer,
        compare: compareReducer,
        [currenciesApi.reducerPath]: currenciesApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(currenciesApi.middleware)
})