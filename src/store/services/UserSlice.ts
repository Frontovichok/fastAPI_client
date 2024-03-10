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
  reducers: {},
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
    });
    builder.addCase(fetchUsers.rejected, (state, action: string | any) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userSlice.reducer;
