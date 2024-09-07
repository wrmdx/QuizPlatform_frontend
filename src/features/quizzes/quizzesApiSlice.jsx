import { apiSlice } from '@/services/api/apiSlice';

export const quizzesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: ({per_page ,page }) => `/admin/quiz?page=${page}&per_page=${per_page}`,
            providesTags: ['Quizzes'],
        }),
        getQuizzesBySkill: builder.query({
            query : ({skill , per_page , page}) => `/admin/quizzes/get_by_skill?skill=${skill}&per_page=${per_page}&page=${page}` ,
            providesTags: ['Quizzes'],
        }),
        getQuizzesByDifficulty: builder.query({
            query : ({difficulty , per_page , page}) => `/admin/quizzes/get_by_difficulty?difficulty=${difficulty}&per_page=${per_page}&page=${page}` ,
            providesTags: ['Quizzes'],
        }),
        searchQuizzesByTitle: builder.query({
            query : ({title , per_page, page}) => `/admin/quizzes/search_by_title?title=${title}&page=${page}&per_page=${per_page}` ,
            providesTags: ['Quizzes']
        }),
        addQuiz: builder.mutation({
            query: (body) => ({
                url:'/admin/quiz' ,
                method:'POST' ,
                body: body
            }),
            invalidatesTags: ['Quizzes'],
        }),
        deleteQuiz: builder.mutation({
            query: (quizId) => ({
                url: `/admin/quiz/${quizId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Quizzes'],
        }),
        assignQuizQuestions: builder.mutation({
            query: ({body ,quizId}) => ({
                url:`/admin/quiz/${quizId}/assign-questions` ,
                method:'POST' ,
                body: body
            }),
            invalidatesTags: ['Quizzes'],
        }),
        deleteQuizQuestions: builder.mutation({
            query: ({quizId,body}) => ({
                url:`/admin/quiz/${quizId}/delete-questions` ,
                method:'DELETE' ,
                body: body
            }),
            invalidatesTags: ['Quizzes'],
        }),
    }),
})

export const { useGetQuizzesQuery, useAddQuizMutation , useDeleteQuizMutation, useAssignQuizQuestionsMutation,
    useDeleteQuizQuestionsMutation,useGetQuizzesBySkillQuery, useSearchQuizzesByTitleQuery,
    useGetQuizzesByDifficultyQuery} = quizzesApiSlice;
