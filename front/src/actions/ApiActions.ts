import { getCatsApi, registerUserApi, getLikesApi, deleteLikeApi, getCatByIdApi, addLikeApi } from "../utils/CatApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFavourites } from "../types/TFavourite";

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

export const getCatByIdAction = createAsyncThunk("cats/getCatById", async (id: string) => {
  const response = await getCatByIdApi(id);
  return response;
});

export const getFavouriteCatByIdAction = createAsyncThunk("cats/getFavouriteCatById", async (id: string) => {
  const response = await getCatByIdApi(id);
  return response;
});

export const getFavoritesCatsAction = createAsyncThunk("cats/getFavoritesCats", async (favourites: TFavourites) => {
  const result = [];
  for(const favourite of favourites.data) {
    const cat = await getCatByIdApi(favourite.cat_id);
    result.push(cat);
  }
  return result;
});

export const addLikeAction = createAsyncThunk("likes/addLike", async (id: string) => {
  const response = await addLikeApi(id);
  return response;
});
