import { apiSlice } from '@/services/api/apiSlice';

export const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => `/admin/quiz`,
            providesTags: ['Quizzes'],
        }),
    }),
})

export const { useGetQuizzesQuery} = quizzesApiSlice;
