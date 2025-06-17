import { apiUrl } from "./APIURL";
import { TCats } from "../types/TCats";

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
  })
    .then((response) => checkResponse<TServerResponse<TCats>>(response))
};
