export type SkinType = {
  id: string;
  name: string;
  src: string;
  description: string;
  price: number;
};

export type BoardType = {
  id: string;
  name: string;
  lineColor: string;
  strokeColor: string;
  borderLineColor: string;
  backgroundImageSrc: string;
  description: string;
  price: number;
};

export interface Inventory {
  skins: SkinType[];
  boards: BoardType[];
}
