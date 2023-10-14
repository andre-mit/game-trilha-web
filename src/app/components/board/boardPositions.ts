
type TrackProps = {
    id: 0 | 1 | 2;
    positions: TrackPositionsProps[];
  };
  
  type TrackPositionsProps = {
    line: 0 | 1 | 2;
    column: 0 | 1 | 2;
    position: PositionProps;
  };
  
  type PositionProps = {
    x: number;
    y: number;
  };
  
  export const BoardPositions: TrackProps[] = [
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
  
        { line: 1, column: 0, position: { x: 100, y: 150 } },
        { line: 1, column: 2, position: { x: 200, y: 150 } },
  
        { line: 2, column: 0, position: { x: 100, y: 200 } },
        { line: 2, column: 1, position: { x: 150, y: 200 } },
        { line: 2, column: 2, position: { x: 200, y: 200 } },
      ],
    },
  ];
  