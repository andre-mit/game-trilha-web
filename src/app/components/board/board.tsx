import { motion } from "framer-motion";
import { BoardPositions } from "./boardPositions";
import { PlaceProps } from "./piece";
import { Board } from "@/app/(authorized)/game/play/@types/board";

export const drawEffect = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    };
  },
};

export default function Board({
  children,
  freePlaces = [],
  handleMove,
  customBoardProps,
}: {
  children?: React.ReactNode;
  freePlaces: PlaceProps[];
  handleMove: (to: PlaceProps) => void;
  customBoardProps?: Board;
}) {
  return (
    <motion.svg
      className="rounded-lg flex-1 max-h-[350px] max-w-[350px] sm:max-h-[500px] sm:max-w-[500px] md:max-h-[600px] md:max-w-[600px] lg:max-h-[800px] lg:max-w-[800px]"
      viewBox="-15 -15 330 330"
      xmlns="http://www.w3.org/2000/svg"
      fill={customBoardProps?.bulletColor || "#000"}
      stroke={customBoardProps?.borderLineColor || "#000"}
      style={{
        backgroundImage: customBoardProps?.imageSrc
          ? `url('${customBoardProps.imageSrc}')`
          : "",
        backgroundSize: "cover",
      }}
    >
      <g name="board">
        <g name="ligacoes">
          <line x1="153" y1="0" x2="153" y2="100" />
          <line
            x1="150"
            y1="0"
            x2="150"
            y2="100"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="147" y1="0" x2="147" y2="100" />

          <line x1="153" y1="200" x2="153" y2="300" />
          <line
            x1="150"
            y1="200"
            x2="150"
            y2="300"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="147" y1="200" x2="147" y2="300" />

          <line x1="0" y1="153" x2="100" y2="153" />
          <line
            x1="0"
            y1="150"
            x2="100"
            y2="150"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="0" y1="147" x2="100" y2="147" />

          <line x1="200" y1="153" x2="300" y2="153" />
          <line
            x1="200"
            y1="150"
            x2="300"
            y2="150"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="200" y1="147" x2="300" y2="147" />
        </g>

        <g name="t0">
          <line x1="0" y1="-3" x2="300" y2="-3" />
          <line
            x1="0"
            y1="0"
            x2="300"
            y2="0"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="0" y1="3" x2="300" y2="3" />

          <line x1="0" y1="303" x2="300" y2="303" />
          <line
            x1="0"
            y1="300"
            x2="300"
            y2="300"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="0" y1="297" x2="300" y2="297" />

          <line x1="3" y1="0" x2="3" y2="300" />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="300"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="-3" y1="0" x2="-3" y2="300" />

          <line x1="303" y1="0" x2="303" y2="300" />
          <line
            x1="300"
            y1="0"
            x2="300"
            y2="300"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="297" y1="0" x2="297" y2="300" />

          {BoardPositions[0].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
              </g>
            );
          })}
        </g>

        <g name="t1">
          <line x1="50" y1="47" x2="250" y2="47" />
          <line
            x1="50"
            y1="50"
            x2="250"
            y2="50"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="50" y1="53" x2="250" y2="53" />

          <line x1="50" y1="253" x2="250" y2="253" />
          <line
            x1="50"
            y1="250"
            x2="250"
            y2="250"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="50" y1="247" x2="250" y2="247" />

          <line x1="53" y1="50" x2="53" y2="250" />
          <line
            x1="50"
            y1="50"
            x2="50"
            y2="250"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="47" y1="50" x2="47" y2="250" />

          <line x1="253" y1="50" x2="253" y2="250" />
          <line
            x1="250"
            y1="50"
            x2="250"
            y2="250"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="247" y1="50" x2="247" y2="250" />

          {BoardPositions[1].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
              </g>
            );
          })}
        </g>

        <g name="t2 ">
          <line x1="100" y1="103" x2="200" y2="103" />
          <line
            x1="100"
            y1="100"
            x2="200"
            y2="100"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="100" y1="97" x2="200" y2="97" />

          <line x1="100" y1="203" x2="200" y2="203" />
          <line
            x1="100"
            y1="200"
            x2="200"
            y2="200"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="100" y1="197" x2="200" y2="197" />

          <line x1="97" y1="100" x2="97" y2="200" />
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="200"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="103" y1="100" x2="103" y2="200" />

          <line x1="197" y1="100" x2="197" y2="200" />
          <line
            x1="200"
            y1="100"
            x2="200"
            y2="200"
            strokeWidth="3"
            stroke={customBoardProps?.lineColor}
          />
          <line x1="203" y1="100" x2="203" y2="200" />

          {BoardPositions[2].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
              </g>
            );
          })}
        </g>
      </g>
      <g>{children}</g>
    </motion.svg>
  );
}
