import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../store/services/auth";
import { RootState } from "../../store/store";

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null as any,
    pending: false as boolean,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
        console.log("login.matchFulfilled");
        state.user = null;
        state.pending = false;
      })
      .addMatcher(api.endpoints.login.matchPending, (state, { payload }) => {
        console.log("login.matchPending");
        state.pending = true;
      })
      .addMatcher(
        api.endpoints.userData.matchFulfilled,
        (state, { payload }) => {
          console.log("userData.matchFulfilled");
          state.user = payload;
          state.pending = false;
        }
      )
      .addMatcher(api.endpoints.userData.matchPending, (state, { payload }) => {
        console.log("userData.matchPending");
        state.pending = true;
      })
      .addMatcher(api.endpoints.userData.matchRejected, (state) => {
        console.log("userData.matchRejected");
        state.user = false;
        state.pending = false;
      })
      .addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
        console.log("logout.matchFulfilled");
        state.user = null;
        state.pending = false;
      })
      .addMatcher(api.endpoints.logout.matchPending, (state) => {
        console.log("logout.matchRejected");
        state.pending = true;
      })
      .addMatcher(api.endpoints.logout.matchRejected, (state) => {
        console.log("logout.matchRejected");
        state.user = null;
        state.pending = false;
      });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => [
  state.auth.user,
  state.auth.pending,
];
