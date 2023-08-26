import ColorEnum from "@/app/enums/colorEnum";

export default function Piece({ color, skin, cx, cy }: PieceProps) {
  const colorClass = color === ColorEnum.Black ? "black" : "white";
  return (
    <circle cx={cx} cy={cy} r="14" fill={colorClass} strokeWidth={colorClass} />
  );
}

export type PieceProps = {
  id: string;
  color: ColorEnum;
  skin?: string;
  cx: number;
  cy: number;
};
