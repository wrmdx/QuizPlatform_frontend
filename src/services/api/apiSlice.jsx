import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials} from "@/features/auth/authSlice.jsx";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
        console.log('Token expired, refreshing token');
        const refreshResult = await baseQuery('/refresh-token', api, extraOptions);
        if (refreshResult?.data?.token) {
            api.dispatch(setCredentials({ token: refreshResult.data.token }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export const apiSlice = createApi({
    baseQuery ,
    endpoints : (builder) => ({
    })
})
