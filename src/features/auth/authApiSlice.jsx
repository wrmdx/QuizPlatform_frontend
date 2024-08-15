import {apiSlice} from "@/services/api/apiSlice.jsx";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/login',
                method: 'POST',
                body: credentials
            })
        }),
        logout: builder.mutation({
            query: (token) => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
