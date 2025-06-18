import { apiUrl } from "./APIURL";
import { TCats, ICat } from "../types/TCats";
import { TUser } from "../types/TUser";
import { TFavourites, TLikedCat, IFavourite, TUnlikedCat } from "../types/TFavourite";

type TServerResponse<T> = {
  success: boolean;
} & T;

const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getCatsApi = (): Promise<TServerResponse<TCats>> => {
  return fetch(apiUrl.get_ten_random_cats, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiUrl.cats_api_key,
    },
    redirect: "follow",
  }).then((response) => checkResponse<TServerResponse<TCats>>(response));
};

export const getCatByIdApi = (id: string): Promise<TServerResponse<ICat>> => {
  return fetch(apiUrl.get_cat_by_id + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiUrl.cats_api_key,
    },
    redirect: "follow",
  }).then((response) => checkResponse<TServerResponse<ICat>>(response));
};

export const registerUserApi = async (
  login: string,
  password: string
): Promise<TServerResponse<TUser>> => {
  const response = await fetch(apiUrl.user, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  });
  console.log(response.statusText)
  if (response.ok) {

    const userData = await response.json();
    localStorage.setItem("authToken", userData.token);
    return userData;
  }
  return Promise.reject(response.statusText);
};

export const getLikesApi = async (): Promise<TServerResponse<TFavourites>> => {
  return fetch(apiUrl.favourite_cats, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  })
    .then((response) => checkResponse<TServerResponse<TFavourites>>(response))
    .catch((error) => Promise.reject(error));
};

export const deleteLikeApi = async (
  id: string
): Promise<TServerResponse<TUnlikedCat>> => {
  return fetch(apiUrl.favourite_cats + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  })
    .then((response) => {
      if(!response.ok) {
        return Promise.reject(response.statusText);
      }
      return { success: true, cat_id: id };
    })
};

export const addLikeApi = async (
  id: string
): Promise<TServerResponse<IFavourite>> => {
  const token = localStorage.getItem('authToken');

  try {
   const response = await fetch(apiUrl.favourite_cats, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cat_id: id })
    });
    if(response.status === 201) {
      return await response.json();
    }
    throw new Error('Failed to add like')
  } catch(error) {
    throw error;
  }
}