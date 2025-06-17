import { getCatsApi } from "../utils/CatApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCatsAction = createAsyncThunk("cats/getCats", async () => {
  const response = await getCatsApi();
  return response;
});