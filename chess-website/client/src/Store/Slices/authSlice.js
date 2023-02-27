import {createSlice} from "@reduxjs/toolkit";

const initialUserState = {
    username: "Default username",
    email: null,
    avatar: null,
}

const initialState = {
    user: initialUserState,
    authToken: null, //For later
    isAuthenticated: false,
    loaded: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            console.log("Login reducer");
            console.log(action);
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = initialUserState;
            state.isAuthenticated = false;
        },
        loader: (state) => {
            state.loaded = true;
        }
        
    }
})

export const {login, logout, loader} = authSlice.actions;
export default authSlice.reducer;