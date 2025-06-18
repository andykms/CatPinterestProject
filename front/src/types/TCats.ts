export interface ICat {
  id: string;
  url: string;
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