import ColorEnum from "@/app/enums/colorEnum";
import { motion } from "framer-motion";

export default function Piece({
  color,
  skin,
  x,
  y,
}: PieceProps) {
  const colorClass = color === ColorEnum.Black ? "black" : "white";
  return (
    <>
      <motion.circle
        animate={{ cx: x, cy: y }}
        cx={x}
        cy={y}
        r="14"
        fill={colorClass}
        strokeWidth={2}
        stroke={colorClass}
      />
    </>
  );
}

export type PieceProps = {
  id: string;
  color: ColorEnum;
  skin?: string;
  x: number;
  y: number;
};
