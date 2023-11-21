import { PieceProps, PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/enums/colorEnum";

const positionsMoinhoCrossTrack: { line: 0 | 1 | 2; column: 0 | 1 | 2 }[] = [
  { line: 0, column: 1 },
  { line: 1, column: 0 },
  { line: 2, column: 1 },
  { line: 1, column: 2 },
];

export const placeStage = (
  turn: ColorEnum,
  pendingPlacePieces: Record<ColorEnum, number>,
  pieces: PieceProps[] = [],
  playerColor: ColorEnum
) => {
  let freePlaces;
  if (turn == playerColor) {
    freePlaces = getFreePlaces(pieces);
  } else {
    freePlaces = [] as PlaceProps[];
  }

  return { turn, pendingPlacePieces, freePlaces };
};

export function getFreePlaces(pieces: PieceProps[]): PlaceProps[] {
  const freePieces = [] as PlaceProps[];
  for (let track = 0; track < 3; track++) {
    for (let line = 0; line < 3; line++) {
      for (let column = 0; column < 3; column++) {
        if (line === 1 && column === 1) continue;
        const piece = pieces.find(
          (p) =>
            p.place.track === track &&
            p.place.line === line &&
            p.place.column === column
        );
        if (!piece) {
          freePieces.push({
            track: track as 0 | 1 | 2,
            line: line as 0 | 1 | 2,
            column: column as 0 | 1 | 2,
          });
        }
      }
    }
  }
  return freePieces;
}

export const getAvailableRemovePieces = (
  totalPieces: PieceProps[],
  playerColor: ColorEnum
) => {
  var opponentPieces = totalPieces.filter((p) => p.color != playerColor);
  if (opponentPieces.length <= 3) return opponentPieces.map((p) => p.id);
  // verify moinho
  let pieces = opponentPieces.map((p) => {
    return {
      ...p,
      isMoinho:
        moinhoCrossTrack(
          totalPieces,
          p.place.line,
          p.place.column,
          playerColor
        ) ||
        trackHasMoinhoByPosition(
          totalPieces,
          p.place.track,
          p.place.line,
          p.place.column,
          playerColor
        ),
    };
  });

  if (pieces.some((p) => !p.isMoinho)) {
    return pieces.filter((p) => !p.isMoinho).map((p) => p.id);
  }

  return pieces.map((p) => p.id);
};
export function moinhoCrossTrack(
  totalPieces: PieceProps[],
  line: 0 | 1 | 2,
  column: 0 | 1 | 2,
  playerColor: ColorEnum
) {
  if (
    positionsMoinhoCrossTrack.some(
      (p) => p.line === line && p.column === column
    )
  ) {
    const pieces = totalPieces.filter(
      (p) =>
        p.place.line === line &&
        p.place.column === column &&
        p.color != playerColor
    );
    if (pieces.length === 3) {
      return true;
    }
  }
  return false;
}

export const trackHasMoinhoByPosition = (
  totalPieces: PieceProps[],
  track: 0 | 1 | 2,
  line: 0 | 1 | 2,
  column: 0 | 1 | 2,
  platerColor: ColorEnum
) => {
  // verify line
  let pieces = totalPieces.filter(
    (p) =>
      p.place.track === track && p.place.line === line && p.color != platerColor
  );
  if (pieces.length === 3) {
    return true;
  }

  // verify column
  pieces = totalPieces.filter(
    (p) =>
      p.place.track === track &&
      p.place.column === column &&
      p.color != platerColor
  );
  if (pieces.length === 3) {
    return true;
  }

  return false;
};
