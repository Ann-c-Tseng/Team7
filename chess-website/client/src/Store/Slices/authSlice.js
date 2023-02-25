import {createSlice} from "@reduxjs/toolkit";

const initialUserState = {
    username: null,
    email: null,
    avatar: null,
}

const initialState = {
    user: initialUserState,
    authToken: null, //For later
    isAuthenticated: true,
    loaded: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = initialUserState;
        },
        loader: (state) => {
            state.loaded = true;
        }
        
    }
})

export const {login, logout, loader} = authSlice.actions;
export default authSlice.reducer;