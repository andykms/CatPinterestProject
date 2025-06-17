import { TUser } from "../../types/TUser";
import { registerUserAction } from "../../actions/ApiActions";
import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: TUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoading = false;
    });
  },
});

export const userReducer = userSlice.reducer;