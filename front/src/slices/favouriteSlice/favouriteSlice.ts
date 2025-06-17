import { TFavourites } from "../../types/TFavourite";
import { TCats } from "../../types/TCats";
import { createSlice } from "@reduxjs/toolkit";
import { getLikesAction, deleteLikeAction, getFavoritesCatsAction, addLikeAction } from "../../actions/ApiActions";

export interface FavouriteState {
  favourite: TFavourites;
  favouriteCats: TCats;
  isLoading: boolean;
  error: string;
}

const initialState: FavouriteState = {
  favourite: {
    data: []
  },
  favouriteCats: [],
  isLoading: false,
  error: ""
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
    builder.addCase(addLikeAction.fulfilled, (state, action) => {
      state.favourite.data.push(action.payload);
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(addLikeAction.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(addLikeAction.rejected, (state, action) => {
      state.error = action.error.message ? action.error.message : "";
      state.isLoading = false;
    })
    builder.addCase(getFavoritesCatsAction.fulfilled, (state, action)=>{
      state.favouriteCats = action.payload;
      state.isLoading = false;
      state.error = '';
    })
    builder.addCase(getFavoritesCatsAction.pending, (state, _)=>{
      state.isLoading = true;
      state.error = '';
    })
    builder.addCase(getFavoritesCatsAction.rejected, (state, action)=>{
      state.isLoading = false;
      state.error = action.error.message ? action.error.message : '';
    })
  }
});

export const { getLikes } = favouriteSlice.selectors;