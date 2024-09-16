import { apiSlice } from '@/services/api/apiSlice';

export const responsesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResponses: builder.query({
            query: (questionId) => `/question/${questionId}/responses`,
            providesTags: ['Responses'],
        }),
        setResponses: builder.mutation({
            query: ({body, questionId}) =>({
                url: `/question/${questionId}/assign-responses`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Responses'],
        }),
        addResponse: builder.mutation({
            query: ({body}) =>({
                url: `/responses`,
                method: 'POST',
                body : body
            }),
            invalidatesTags: ['Responses'],
        })
    }),
})

export const { useGetResponsesQuery , useSetResponsesMutation , useAddResponseMutation} = responsesApiSlice;