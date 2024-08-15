import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: sessionStorage.getItem('token') || null,
    role: sessionStorage.getItem('role') || null,
    name: sessionStorage.getItem('name') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { token, role, name } = action.payload;
            state.token = token;
            state.role = role;
            state.name = name;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('role', role);
            sessionStorage.setItem('name', name);
        },
        logOut: (state) => {
            sessionStorage.clear();
            state.token = null;
            state.role = null;
            state.name = null;
        },
    },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentName = (state) => state.auth.name;
