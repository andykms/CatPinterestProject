export interface IFavourite {
  cat_id: string;
  created_at: string;
}

export type TFavourite = {
  data: IFavourite[];
}