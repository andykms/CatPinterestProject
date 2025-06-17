import { getCatsApi, registerUserApi, getLikesApi, deleteLikeApi } from "../utils/CatApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getCatsAction = createAsyncThunk("cats/getCats", async () => {
  const response = await getCatsApi();
  return response;
});

export const registerUserAction = createAsyncThunk("user/register", async ({ login, password }: { login: string, password: string }) => {
  const response = await registerUserApi(login, password);
  return response;
});

export const getLikesAction = createAsyncThunk("likes/getLikes", async () => {
  const response = await getLikesApi();
  return response;
});

export const deleteLikeAction = createAsyncThunk("likes/deleteLike", async (id: string) => {
  const response = await deleteLikeApi(id);
  return response;
});