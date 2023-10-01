import ColorEnum from "@/enums/colorEnum";
import { motion } from "framer-motion";
import { BoardPositions } from "@/app/components/board/boardPositions";
import { drawEffect } from "./board";

export type PlaceProps = {
  track: 0 | 1 | 2;
  line: 0 | 1 | 2;
  column: 0 | 1 | 2;
};

export type PieceProps = {
  id: string;
  color: ColorEnum;
  skin?: string;
  highlight: boolean;

  place: PlaceProps;
  onSelect: (place: PlaceProps) => void;
  onRemove: (place: PlaceProps) => void;
};

export default function Piece({
  id,
  color,
  highlight,
  skin,
  place: { track, line, column },
  onSelect,
  onRemove,
}: PieceProps) {
  const colorClass = color === ColorEnum.Black ? "black" : "white";

  const position = BoardPositions[track].positions.find(
    (p) => p.line === line && p.column === column
  )?.position;

  const handleClick = () =>
    highlight
      ? onSelect({ track, line, column })
      : onRemove({track, line, column});

  const x = position?.x;
  const y = position?.y;

  return (
    <>
      <motion.circle
        id={id}
        animate={{ cx: x, cy: y }}
        cx={x}
        cy={y}
        r="11"
        fill={colorClass}
        strokeWidth={2}
        stroke={colorClass}
        onClick={handleClick}
      />
      {highlight && (
        <motion.circle
          cx={x}
          cy={y}
          r="13"
          fill={"transparent"}
          initial="hidden"
          animate="visible"
          stroke="#960000"
          strokeWidth={4}
          variants={drawEffect}
          custom={3}
          className="cursor-pointer"
          onClick={handleClick}
        />
      )}
      ;
    </>
  );
}
