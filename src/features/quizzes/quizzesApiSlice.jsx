import { apiSlice } from '@/services/api/apiSlice';

export const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: ({per_page, page}) => `/quizzes?page=${page}&per_page=${per_page}`,
            providesTags: ['Quizzes'],
        }),
        getQuizzesBySkill: builder.query({
            query: ({skill, per_page, page}) => `/quiz/get-by-skill?skill=${skill}&per_page=${per_page}&page=${page}`,
            providesTags: ['Quizzes'],
        }),
        getQuizzesByDifficulty: builder.query({
            query: ({difficulty, per_page, page}) => `/quiz/get-by-difficulty?difficulty=${difficulty}&per_page=${per_page}&page=${page}`,
            providesTags: ['Quizzes'],
        }),
        searchQuizzesByTitle: builder.query({
            query: ({title, per_page, page}) => `/quiz/search-by-title?title=${title}&page=${page}&per_page=${per_page}`,
            providesTags: ['Quizzes']
        }),
        getQuizQuestions: builder.query({
            query: ({quizId}) => `/quiz/${quizId}/view-questions`,
            providesTags: ['Questions'],
        }),
        addQuiz: builder.mutation({
            query: (body) => ({
                url: '/quizzes',
                method: 'POST',
                body: body,
            }) ,
                invalidatesTags: ['Quizzes'],
            }),
        updateQuiz: builder.mutation({
            query: ({quizId, ...body}) => ({
                url: `/quizzes/${quizId}`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['Quizzes'],
        }),
        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/quizzes/${quizId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quizzes'],
        }),
        assignQuizQuestions: builder.mutation({
            query: ({body, quizId}) => ({
                url: `/quiz/${quizId}/assign-questions`,
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Quizzes', 'Questions'],
        }),
        deleteQuizQuestions: builder.mutation({
            query: ({quizId, body}) => ({
                url: `/quiz/${quizId}/delete-questions`,
                method: 'DELETE',
                body: body
            }),
            invalidatesTags: ['Quizzes', 'Questions'],
        }),
    }),
})

export const {useDeleteQuizQuestionsMutation , useAssignQuizQuestionsMutation  ,
    useGetQuizQuestionsQuery , useGetQuizzesQuery, useAddQuizMutation , useDeleteQuizMutation,
    useGetQuizzesBySkillQuery, useSearchQuizzesByTitleQuery,
    useGetQuizzesByDifficultyQuery , useUpdateQuizMutation} = quizzesApiSlice;
