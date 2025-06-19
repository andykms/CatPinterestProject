import { IPost } from "./TPost";

export interface ICat extends IPost {
  width: number;
  height: number;
  breeds: unknown[];
  favourite: {};
}

export interface TGalleryCat extends ICat {
  galleryId: string;
}

export type TCats = ICat[];
export type TGalleryCats = TGalleryCat[];