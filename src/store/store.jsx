import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "@/services/api/apiSlice";
import authReducer from '@/features/auth/authSlice'
import {questionsApiSlice} from "@/features/questions/questionsApiSlice.jsx";
import {responsesApiSlice} from "@/features/responses/responsesApiSlice.jsx";
import {usersApiSlice} from "@/features/users/usersApiSlice.jsx";
import quizReducer from '@/features/quizzes/quizSlice';
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer ,
        quiz: quizReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [usersApiSlice.reducerPath]: usersApiSlice.reducer,
        [questionsApiSlice.reducerPath]: questionsApiSlice.reducer,
        [responsesApiSlice.reducerPath]: responsesApiSlice.reducer,

    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
