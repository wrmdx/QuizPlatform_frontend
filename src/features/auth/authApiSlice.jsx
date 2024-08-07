import {apiSlice} from "@/services/api/apiSlice.jsx";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints : builder =>({
        login : builder.mutation({
            query : credentials => ({
                url : '/login' ,
                method : 'POST' ,
                body: credentials
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: credentials
            })
        }),
        logout : builder.mutation({
            query : () =>({
                url:'/logout' ,
                method:'POST'
            })
        })
    })
});
export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApiSlice;
