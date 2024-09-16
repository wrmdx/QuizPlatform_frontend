import { apiSlice } from '@/services/api/apiSlice';

export const questionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchQuestions: builder.query({
            query: ({search , per_page , page}) => ({
                url: `/question/search-by-description`,
                params: { description: search, per_page, page },
            }),
            providesTags: ['Questions'],
        }),
        getQuestions: builder.query({
            query: ({per_page, page}) => ({
                url: `/questions`,
                params: { per_page, page },
            }),
            providesTags: ['Questions'],
        }),
        deleteQuestion: builder.mutation({
            query: (questionId) => ({
                url: `/questions/${questionId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Questions'],
        }),
        addQuestion: builder.mutation({
            query: (body) => ({
                url: `/questions`,
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['Questions'],
        }),
    }),
})

export const { useSearchQuestionsQuery, useGetQuestionsQuery, useDeleteQuestionMutation,
    useAddQuestionMutation } = questionsApiSlice;
