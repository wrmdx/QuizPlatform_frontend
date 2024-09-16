import {apiSlice} from "@/services/api/apiSlice.jsx";

export const statsApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        GetUsersTotalByType: builder.query({
            query: () => `/stats/users/total-by-type`,
            providesTags: ['Stats'],
        }),

    })

})

export const {useGetUsersTotalByTypeQuery} = statsApiSlice ;