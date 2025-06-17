export interface ICat {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: unknown[];
  favourite: {};
}

export type TCats = ICat[];