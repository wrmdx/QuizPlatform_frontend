import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        user: null,
        name: localStorage.getItem('name') || null,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, token, role, name } = action.payload;
            state.token = token;
            state.user = user;
            state.role = role;
            state.name = name;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('name', name);
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.name = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentName = (state) => state.auth.name;
