import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const currenciesApi = createApi({
    reducerPath: 'currencies',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://currency-converter-pro1.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '1cdc29d1fbmsh8c7f4b7d7ca48d8p1e78ddjsn2f86475e8467'),
                headers.set('X-RapidAPI-Host', 'currency-converter-pro1.p.rapidapi.com');
            return headers
        }
    }),
    endpoints: (builder) => ({

        getCurrencies: builder.query({
            query: () => '/currencies',
            transformResponse: (response) => { return Object.keys(response.result) }
        }),
        getConversionCurrency: builder.query({
            query: (args) => {
                const { from, to, amount } = args
                return {
                    url: `/convert?from=${from}&to=${to}&amount=${amount}`
                }
            }
        }),
        getCompareCurrencies: builder.query({
            query: (currency) => `/latest-rates?base=${currency}&page=1&per_page=20`
        })

    })
})
export const { useGetCurrenciesQuery, useLazyGetConversionCurrencyQuery, useLazyGetCompareCurrenciesQuery } = currenciesApi;