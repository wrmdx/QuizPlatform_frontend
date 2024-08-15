import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "@/services/api/apiSlice.jsx";
import authReducer from '@/features/auth/authSlice.jsx'
import usersReducer from '@/features/users/usersSlice';
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer ,
        users: usersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
