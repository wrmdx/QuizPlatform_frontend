import { apiSlice } from '@/services/api/apiSlice';

export const questionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchQuestions: builder.mutation({
            query: (searchTerm) => ({
                url: `/admin/questions/search`,
                method: 'POST',
                body: { search: searchTerm },
            }),
            providesTags: ['Questions'],
        }),
        deleteQuestion: builder.mutation({
            query: (questionId) => ({
                url: `/admin/questions/${questionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Questions'],
        }),
        addQuestion: builder.mutation({
            query: (body) => ({
                url: `/admin/questions`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Questions'],
        }),
        getQuestion: builder.query({
            query: (id) => ({
                url: `/admin/questions/${id}`,
                method: 'GET',
            }),
            providesTags: ['Questions'],
        }),
    }),
})

export const { useSearchQuestionsMutation,useGetQuestionQuery, useDeleteQuestionMutation , useAddQuestionMutation} = questionsApiSlice;
