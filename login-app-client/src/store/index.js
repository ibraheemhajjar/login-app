import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
     accessToken: localStorage.getItem("accessToken") || null,
     refreshToken: localStorage.getItem("refreshToken") || null,
     isLoggedIn: false,
};

const userSlice = createSlice({
     name: "user",
     initialState: initialState,
     reducers: {
          login(state, action) {
               state.isLoggedIn = true;
               state.accessToken = action.payload.accessToken;
               state.refreshToken = action.payload.refreshToken;
          },
          logout(state, action) {
               state.isLoggedIn = false;
          },
          refreshAccessToken(state, action) {
               state.accessToken = action.payload;
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
