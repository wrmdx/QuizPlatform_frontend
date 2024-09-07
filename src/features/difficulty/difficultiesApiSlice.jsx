import {apiSlice} from "@/services/api/apiSlice.jsx";

export const difficultiesApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDifficulties: builder.query({
            query: () => `/admin/quiz_difficulty`,
            providesTags: ['Difficulties'],
        }),
        addDifficulty : builder.mutation({
            query: (body) => ({
                url: `/admin/quiz_difficulty`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Difficulties'],
        }),
    })

})

export const {useGetDifficultiesQuery , useAddDifficultyMutation} = difficultiesApiSlice ;
