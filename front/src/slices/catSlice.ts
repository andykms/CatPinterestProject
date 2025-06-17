import { TCats } from "../types/TCats";
import { createSlice } from "@reduxjs/toolkit";
import { getCatsAction } from "../actions/ApiActions";

export type TPagination = {
  page: number;
  limit: number;
  isPeak: boolean;
};

export interface ICatState {
  cats: TCats;
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCatsAction.pending, (state) => {
      state.isLoad = true;
    });
    builder.addCase(getCatsAction.fulfilled, (state, action) => {
      state.cats = action.payload;
      state.isLoad = false;
    });
    builder.addCase(getCatsAction.rejected, (state, _) => {
      state.isLoad = false;
      state.error = 'Ошибка загрузки котиков';
    });
  },

  reducers: {
    paginate: (state, _) => {
      state.pagination.page+=1;
    },
  },
});


