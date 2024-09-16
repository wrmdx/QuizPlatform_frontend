import {apiSlice} from "@/services/api/apiSlice.jsx";

export const difficultiesApiSlice =  apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDifficulties: builder.query({
            query: () => `/quiz-difficulties`,
            providesTags: ['Difficulties'],
        }),
        addDifficulty : builder.mutation({
            query: (body) => ({
                url: `/quiz-difficulties`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Difficulties'],
        }),
    })

})

export const {useGetDifficultiesQuery , useAddDifficultyMutation} = difficultiesApiSlice ;
