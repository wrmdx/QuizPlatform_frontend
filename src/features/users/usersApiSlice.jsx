import { apiSlice } from '@/services/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({per_page, page}) => `/users?page=${page}&per_page=${per_page}`,
            providesTags: ['Users'],
        }),
        getUsersByRole: builder.query({
            query : ({roleName ,page , per_page}) => `/user/paginate-by-role?role_name=${roleName}&page=${page}&per_page=${per_page}` ,
            providesTags: ['Users']
        }),
        getUsersByEmail: builder.query({
            query : ({email , per_page,  page}) =>  `/user/search?email=${email}&per_page=${per_page}&page=${page}` ,
            providesTags:['Users']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/users',
                method: 'POST',
                body : body,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({id ,...body}) => ({
                url: `/users/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Users'],
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: '/users/change-password',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation,useAddUserMutation , useUpdateUserMutation, useGetUsersByRoleQuery , useGetUsersByEmailQuery , useChangePasswordMutation} = usersApiSlice;
