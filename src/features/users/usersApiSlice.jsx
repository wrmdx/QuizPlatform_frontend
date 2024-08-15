import { apiSlice } from '@/services/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => `/admin/users`,
            providesTags: ['User'],
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/admin/users',
                method: 'POST',
                body : body,
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation({
            query: ({id ,...body}) => ({
                url: `/admin/users/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation,useAddUserMutation , useUpdateUserMutation} = usersApiSlice;
