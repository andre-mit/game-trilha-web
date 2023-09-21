import { motion } from "framer-motion";
import { BoardPositions } from "./boardPositions";
import { PlaceProps } from "./piece";
import { useEffect } from "react";

export default function Board({
  children,
  freePlaces = [],
  handleMove,
}: {
  children?: React.ReactNode;
  freePlaces: PlaceProps[];
  handleMove: (to: PlaceProps) => void;
}) {
  const draw = {
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

  return (
    <motion.svg
      width={800}
      height={800}
      className="fill-slate-500 stroke-gray-400 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
      viewBox="-15 -15 330 330"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g name="board">
        <g name="ligacoes">
          <line x1="150" y1="0" x2="150" y2="100" strokeWidth="5" />
          <line x1="150" y1="200" x2="150" y2="300" strokeWidth="5" />

          <line x1="0" y1="150" x2="100" y2="150" strokeWidth="5" />
          <line x1="200" y1="150" x2="300" y2="150" strokeWidth="5" />
        </g>

        <g name="t0">
          <line x1="0" y1="0" x2="300" y2="0" strokeWidth="5" />
          <line x1="0" y1="300" x2="300" y2="300" strokeWidth="5" />

          <line x1="0" y1="0" x2="0" y2="300" strokeWidth="5" />
          <line x1="300" y1="0" x2="300" y2="300" strokeWidth="5" />

          {BoardPositions[0].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                 
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
                {freePlaces.some(
                  (f) =>
                    f.track === 0 &&
                    f.column === position.column &&
                    f.line === position.line
                ) && (
                  <motion.circle
                    cx={position.position.x}
                    cy={position.position.y}
                    r="10"
                    fill={"transparent"}
                    initial="hidden"
                    animate="visible"
                    stroke="#00962d"
                    strokeWidth={3}
                    variants={draw}
                    custom={3}
                    className="cursor-pointer"
                    onClick={() => {
                      handleMove({
                        track: 0,
                        line: position.line,
                        column: position.column,
                      });
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>

        <g name="t1">
          <line x1="50" y1="50" x2="250" y2="50" strokeWidth="5" />
          <line x1="50" y1="250" x2="250" y2="250" strokeWidth="5" />

          <line x1="50" y1="50" x2="50" y2="250" strokeWidth="5" />
          <line x1="250" y1="50" x2="250" y2="250" strokeWidth="5" />

          {BoardPositions[1].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                 
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
                {freePlaces.some(
                  (f) =>
                    f.track === 1 &&
                    f.column === position.column &&
                    f.line === position.line
                ) && (
                  <motion.circle
                    cx={position.position.x}
                    cy={position.position.y}
                    r="10"
                    fill={"transparent"}
                    initial="hidden"
                    animate="visible"
                    stroke="#00962d"
                    strokeWidth={3}
                    variants={draw}
                    custom={3}
                    className="cursor-pointer"
                    onClick={() => {
                      handleMove({
                        track: 1,
                        line: position.line,
                        column: position.column,
                      });
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>

        <g name="t2">
          <line x1="100" y1="100" x2="200" y2="100" strokeWidth="5" />
          <line x1="100" y1="200" x2="200" y2="200" strokeWidth="5" />

          <line x1="100" y1="100" x2="100" y2="200" strokeWidth="5" />
          <line x1="200" y1="100" x2="200" y2="200" strokeWidth="5" />

          {BoardPositions[2].positions.map((position) => {
            return (
              <g key={position.line + "-" + position.column}>
                <circle
                 
                  cx={position.position.x}
                  cy={position.position.y}
                  r="10"
                />
                {freePlaces.some(
                  (f) =>
                    f.track === 2 &&
                    f.column === position.column &&
                    f.line === position.line
                ) && (
                  <motion.circle
                    cx={position.position.x}
                    cy={position.position.y}
                    r="10"
                    fill={"transparent"}
                    initial="hidden"
                    animate="visible"
                    stroke="#00962d"
                    strokeWidth={3}
                    variants={draw}
                    custom={3}
                    className="cursor-pointer"
                    onClick={() => {
                      handleMove({
                        track: 2,
                        line: position.line,
                        column: position.column,
                      });
                    }}
                  />
                )}
              </g>
            );
          })}
        </g>
      </g>
      <g>{children}</g>
    </motion.svg>
  );
}
