import { apiSlice } from '@/services/api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({per_page, page}) => `/admin/users?page=${page}&per_page=${per_page}`,
            providesTags: ['Users'],
        }),
        getUsersByRole: builder.query({
            query : ({roleName ,page , per_page}) => `/admin/user/paginate_by_role?role_name=${roleName}&page=${page}&per_page=${per_page}` ,
            providesTags: ['Users']
        }),
        getUsersByEmail: builder.query({
            query : ({email , per_page,  page}) =>  `/admin/user/search?email=${email}&per_page=${per_page}&page=${page}` ,
            providesTags:['Users']
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `/admin/users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        addUser: builder.mutation({
            query: (body) => ({
                url: '/admin/users',
                method: 'POST',
                body : body,
            }),
            invalidatesTags: ['Users'],
        }),
        updateUser: builder.mutation({
            query: ({id ,...body}) => ({
                url: `/admin/users/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['Users'],
        }),
        changePassword: builder.mutation({
            query: (body) => ({
                url: '/admin/user/change_password',
                method: 'POST',
                body: body,
            }),
        }),
    }),
});

export const { useGetUsersQuery, useDeleteUserMutation,useAddUserMutation , useUpdateUserMutation, useGetUsersByRoleQuery , useGetUsersByEmailQuery , useChangePasswordMutation} = usersApiSlice;
