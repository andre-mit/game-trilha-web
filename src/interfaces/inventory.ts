export type SkinType = {
  id: string;
  name: string;
  src: string;
  description: string;
  price: number;
  selected: boolean;
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
  selected: boolean;
};

export interface Inventory {
  skins: SkinType[];
  boards: BoardType[];
}
