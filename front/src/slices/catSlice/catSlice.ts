import { TGalleryCats } from "../../types/TCats";
import { createSlice } from "@reduxjs/toolkit";
import { getCatsAction } from "../../actions/ApiActions";
import { v4 as uuidv4 } from 'uuid';
import { TPagination } from "../../types/TPagination";

export interface ICatState {
  cats: TGalleryCats;
  isLoad: boolean;
  error: string;
  pagination: TPagination;
}

export const initialState: ICatState = {
  cats: [],
  pagination: {
    page: 1,
    limit: 10,
    isPeak: false,
  },
  isLoad: false,
  error: "",
};

export const catSlice = createSlice({
  name: "cat",
  initialState,
  selectors: {
    getLastCats: (state) => {
      const start = state.pagination.page * state.pagination.limit - state.pagination.limit;
      const end = state.pagination.page * state.pagination.limit;
      return state.cats.slice(start, end);
    },
    getCats: (state) => state.cats,
    isPeak: (state) => state.pagination.isPeak,
  },
  extraReducers: (builder) => {
    builder.addCase(getCatsAction.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(getCatsAction.fulfilled, (state, action) => {
      const loadedCats: TGalleryCats = [];
      action.payload.forEach((cat) => {
        loadedCats.push({...cat, galleryId: uuidv4()});
      });
      const newCats = [...state.cats, ...loadedCats]
      state.cats = newCats;
      if(action.payload.length < state.pagination.limit) {
        state.pagination.isPeak = true;
      }
      state.isLoad = false;
    });
    builder.addCase(getCatsAction.rejected, (state, _) => {
      state.isLoad = false;
      state.error = 'Ошибка загрузки котиков :`(';
    });
  },

  reducers: {
    paginate: (state) => {
      state.pagination.page+=1;
    },
  },
});

export const { paginate } = catSlice.actions;
export const { getLastCats, isPeak, getCats } = catSlice.selectors;
export const catReducer = catSlice.reducer;