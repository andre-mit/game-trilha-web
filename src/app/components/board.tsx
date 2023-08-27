export default function Board({ children }: { children?: React.ReactNode }) {
  return (
    <svg
      width={500}
      height={500}
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
              <circle
                key={position.line + "-" + position.column}
                cx={position.position.x}
                cy={position.position.y}
                r="10"
              />
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
              <circle
                key={position.line + "-" + position.column}
                cx={position.position.x}
                cy={position.position.y}
                r="10"
              />
            );
          })
          }
        </g>

        <g name="t2">
          <line x1="100" y1="100" x2="200" y2="100" strokeWidth="5" />
          <line x1="100" y1="200" x2="200" y2="200" strokeWidth="5" />

          <line x1="100" y1="100" x2="100" y2="200" strokeWidth="5" />
          <line x1="200" y1="100" x2="200" y2="200" strokeWidth="5" />

          {BoardPositions[2].positions.map((position) => {
            return (
              <circle
                key={position.line + "-" + position.column}
                cx={position.position.x}
                cy={position.position.y}
                r="10"
              />
            );
          })}
        </g>
      </g>
      <g>{children}</g>
    </svg>
  );
}

type Track = {
  id: number;
  positions: TrackPositions[];
};

type TrackPositions = {
  line: number;
  column: number;
  position: Position;
};

type Position = {
  x: number;
  y: number;
};

export const BoardPositions: Track[] = [
  {
    id: 0,
    positions: [
      { line: 0, column: 0, position: { x: 0, y: 0 } },
      { line: 0, column: 1, position: { x: 150, y: 0 } },
      { line: 0, column: 2, position: { x: 300, y: 0 } },

      { line: 1, column: 0, position: { x: 0, y: 150 } },
      { line: 1, column: 2, position: { x: 300, y: 150 } },

      { line: 2, column: 0, position: { x: 0, y: 300 } },
      { line: 2, column: 1, position: { x: 150, y: 300 } },
      { line: 2, column: 2, position: { x: 300, y: 300 } },
    ],
  },
  {
    id: 1,
    positions: [
      { line: 0, column: 0, position: { x: 50, y: 50 } },
      { line: 0, column: 1, position: { x: 150, y: 50 } },
      { line: 0, column: 2, position: { x: 250, y: 50 } },

      { line: 1, column: 0, position: { x: 50, y: 150 } },
      { line: 1, column: 2, position: { x: 250, y: 150 } },

      { line: 2, column: 0, position: { x: 50, y: 250 } },
      { line: 2, column: 1, position: { x: 150, y: 250 } },
      { line: 2, column: 2, position: { x: 250, y: 250 } },
    ],
  },
  {
    id: 2,
    positions: [
      { line: 0, column: 0, position: { x: 100, y: 100 } },
      { line: 0, column: 1, position: { x: 150, y: 100 } },
      { line: 0, column: 2, position: { x: 200, y: 100 } },

      { line: 1, column: 0, position: { x: 100, y: 200 } },
      { line: 1, column: 2, position: { x: 200, y: 200 } },

      { line: 2, column: 0, position: { x: 100, y: 300 } },
      { line: 2, column: 1, position: { x: 150, y: 300 } },
      { line: 2, column: 2, position: { x: 200, y: 300 } },
    ],
  },
];
