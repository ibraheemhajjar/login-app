import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
     accessToken: localStorage.getItem("accessToken"),
     refreshToken: localStorage.getItem("refreshToken"),
     isLoggedIn: false,
};

const userSlice = createSlice({
     name: "user",
     initialState: initialState,
     reducers: {
          login(state) {
               state.isLoggedIn = true;
          },
          logout(state) {
               state.isLoggedIn = false;
          },
          setAccessToken(state, action) {
               state.accessToken = action.payload;
          },
          setRefreshToken(state, action) {
               state.refreshToken = action.payload;
          },
     },
});

const store = configureStore({
     reducer: {
          user: userSlice.reducer,
     },
});

export const userActions = userSlice.actions;
export default store;
