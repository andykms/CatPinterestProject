import { TFavourite } from "../../types/TFavourite";
import { createSlice } from "@reduxjs/toolkit";
import { getLikesAction, deleteLikeAction } from "../../actions/ApiActions";

export interface FavouriteState {
  favourite: TFavourite;
  isLoading: boolean;
  error: string;
  lastDeletedLikeId: string;
}

const initialState: FavouriteState = {
  favourite: {
    data: []
  },
  isLoading: false,
  error: "",
  lastDeletedLikeId: ""
};

export const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
  selectors: {
    getLikes: (state) => state.favourite.data,
  },
  extraReducers: (builder) =>{
    builder.addCase(getLikesAction.fulfilled, (state, action) => {
      state.favourite = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(getLikesAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getLikesAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoading = false;
    })
    builder.addCase(deleteLikeAction.fulfilled, (state, action) => {
      const newData = state.favourite.data.filter(like => like.cat_id !== action.payload.id);
      state.favourite.data = newData;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(deleteLikeAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(deleteLikeAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoading = false;
    })
  }
});

export const { getLikes } = favouriteSlice.selectors;