import { apiSlice } from '@/services/api/apiSlice';

export const questionsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchQuestions: builder.query({
            query: ({search , per_page , page}) => ({
                url: `/admin/question/search_by_description`,
                params: { description: search, per_page, page },
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
                body: body,
            }),
            invalidatesTags: ['Questions'],
        }),
        getQuestions: builder.query({
            query: ({per_page, page}) => ({
                url: `/admin/questions`,
                params: { per_page, page },
            }),
            providesTags: ['Questions'],
        }),
    }),
})

export const { useSearchQuestionsQuery, useGetQuestionsQuery, useDeleteQuestionMutation, useAddQuestionMutation } = questionsApiSlice;
