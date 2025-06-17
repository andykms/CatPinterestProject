import { apiUrl } from "./APIURL";
import { TCats } from "../types/TCats";
import { TUser } from "../types/TUser";
import { TFavourite } from "../types/TFavourite";

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

  if (response.status === 201) {
    const token = response.headers.get("X-Auth-Token");
    token && localStorage.setItem("authToken", token); // Сохраняем токен

    const userData = await response.json();
    return userData;
  }
  return Promise.reject("Registration failed");
};

export const getLikesApi = async (): Promise<TServerResponse<TFavourite>> => {
  return fetch(apiUrl.favourite_cats, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  })
    .then((response) => checkResponse<TServerResponse<TFavourite>>(response))
    .catch((error) => Promise.reject(error));
};

export const deleteLikeApi = async (
  id: string
): Promise<TServerResponse<{ id: string }>> => {
  return fetch(apiUrl.favourite_cats + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    },
  })
    .then((response) =>
      checkResponse<TServerResponse<{ id: string }>>(response)
    )
    .then(() => {
      return { success: true, id };
    })
    .catch((error) => Promise.reject(error));
};
