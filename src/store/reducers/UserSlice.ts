import { error } from "console";
import { IUser } from "../../models/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { fetchUsers } from "./ActionCreators";

interface UserState {
  users: IUser[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: "",
  count: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    usersFetching(state) {
      state.isLoading = true;
    },
    usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = "";
      state.users = action.payload;
    },
    usersFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.isLoading = false;
        state.error = "";
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
      // state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action: string | any) => {
      state.isLoading = false;
      state.error = action.payload;
      // state.users = action.payload;
    });
  },
  // extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
  //   builder.addCase(fetchUsers.pending, (state, action: PayloadAction<IUser[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.users = action.payload;
  //   })
  //   builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<IUser[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.users = action.payload;
  //   })
  //   builder.addCase(fetchUsers.rejected, (state, action: PayloadAction<IUser[]>) => {
  //     state.isLoading = false;
  //     state.error = "";
  //     state.users = action.payload;
  //   }),
  // },
});

export default userSlice.reducer;
