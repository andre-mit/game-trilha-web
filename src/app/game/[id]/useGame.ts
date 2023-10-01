import { useReducer } from "react";
import { PieceProps, PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/enums/colorEnum";

type StateProps = {
  turn: ColorEnum;
  freePlaces: PlaceProps[];
  selectedPiece: PlaceProps | null;
  playType: "move" | "place" | "remove";
  pendingPlacePieces: Record<ColorEnum, number>;
  timer: number;
  pieces: PieceProps[];
};

type ActionProps =
  | {
      type: "makeMove";
      payload: { from: PlaceProps; to: PlaceProps };
    }
  | {
      type: "makePlace";
      payload: {
        pieceId: string;
        place: [number, number, number];
        color: ColorEnum;
        pendingPieces: Record<ColorEnum, number>;
      };
    }
  | {
      type: "makeRemove";
      payload: { track: number; line: number; column: number };
    }
  | {
      type: "placeStage";
      payload: {
        turn: ColorEnum;
        pendingPieces: Record<ColorEnum, number>;
      };
    }
  | {
      type: "moveStage";
      payload: ColorEnum;
    }
  | {
      type: "removeStage";
      payload: ColorEnum;
    }
  | {
      type: "toggleSelectPiece";
      payload: PlaceProps;
    };

export default function useGame(color: ColorEnum) {
  const makePlace = ({
    pieceId,
    place,
    color,
    pendingPieces,
  }: {
    pieceId: string;
    place: [number, number, number];
    color: ColorEnum;
    pendingPieces: Record<ColorEnum, number>;
  }) => {
    const [track, line, column] = place;

    const newPiece: PieceProps = {
      id: pieceId,
      color,
      place: { track, line, column } as PlaceProps,
      highlight: false,
      onSelect(place) {
        dispatch({ type: "toggleSelectPiece", payload: place });
      },
      onRemove() {},
    };

    return { pendingPlacePieces: pendingPieces, piece: newPiece };
  };

  const placeStage = (
    turn: ColorEnum,
    pendingPlacePieces: Record<ColorEnum, number>,
    pieces: PieceProps[] = []
  ) => {
    let freePlaces;
    if (turn == color) {
      freePlaces = getFreePlaces(pieces);
    } else {
      freePlaces = [] as PlaceProps[];
    }

    return { turn, pendingPlacePieces, freePlaces };
  };

  function getFreePlaces(pieces: PieceProps[]): PlaceProps[] {
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

  function getAvailableRemovePieces() {
    var opponentPieces = state.pieces.filter((p) => p.color !== color);
    // verify moinho
    let pieces = opponentPieces.map((p) => {
      return {
        ...p,
        isMoinho:
          moinhoCrossTrack(p.place.line, p.place.column) ||
          trackHasMoinhoByPosition(p.place.track, p.place.line, p.place.column),
      };
    });

    if (pieces.some((p) => !p.isMoinho)) {
      return pieces.filter((p) => !p.isMoinho).map((p) => p.id);
    }

    return pieces.map((p) => p.id);
  }

  const positionsMoinhoCrossTrack = [
    { line: 0, column: 1 },
    { line: 1, column: 0 },
    { line: 2, column: 1 },
    { line: 1, column: 2 },
  ];

  function moinhoCrossTrack(line: number, column: number) {
    if (
      positionsMoinhoCrossTrack.some(
        (p) => p.line === line && p.column === column
      )
    ) {
      const pieces = state.pieces.filter(
        (p) =>
          p.place.line === line &&
          p.place.column === column &&
          p.color !== color
      );
      if (pieces.length === 3) {
        return true;
      }
    }
    return false;
  }

  function trackHasMoinhoByPosition(
    track: number,
    line: number,
    column: number
  ) {
    // verify line
    let pieces = state.pieces.filter(
      (p) =>
        p.place.track === track && p.place.line === line && p.color !== color
    );
    if (pieces.length === 3) {
      return true;
    }

    // verify column
    pieces = state.pieces.filter(
      (p) =>
        p.place.track === track &&
        p.place.column === column &&
        p.color !== color
    );
    if (pieces.length === 3) {
      return true;
    }

    return false;
  }

  const reducer = (state: StateProps, action: ActionProps): StateProps => {
    switch (action.type) {
      case "placeStage":
        const placeStageResult = placeStage(
          action.payload.turn,
          action.payload.pendingPieces,
          state.pieces
        );
        return { ...state, ...placeStageResult };
      case "moveStage":
        const turn = action.payload;
        const playType = "move";
        const timer = 15;
        const freePlaces = [] as PlaceProps[];
        return { ...state, turn, playType, timer, freePlaces };
      case "removeStage":
        if (action.payload !== color) return state;

        const pType = "remove";
        const availableRemove = getAvailableRemovePieces();
        console.log("Available", availableRemove);
        const piecesHighlight = state.pieces.map((p) => {
          return {
            ...p,
            highlight: availableRemove.includes(p.id),
          };
        });

        return { ...state, pieces: piecesHighlight, playType: pType };
      case "makePlace":
        const makePlaceResult = makePlace(action.payload);

        return {
          ...state,
          pendingPlacePieces: makePlaceResult.pendingPlacePieces,
          pieces: [...state.pieces, makePlaceResult.piece],
        };
      case "makeMove":
        var newPieces = [...state.pieces];

        var index = newPieces.findIndex(
          (p) =>
            p.place.track === action.payload.from.track &&
            p.place.line === action.payload.from.line &&
            p.place.column === action.payload.from.column
        );

        newPieces[index].place = {
          track: action.payload.to.track,
          line: action.payload.to.line,
          column: action.payload.to.column,
        };

        return { ...state, pieces: newPieces };
      case "makeRemove":
        const newPiecesRemoved = state.pieces
          .filter(
            (p) =>
              p.place.track !== action.payload.track ||
              p.place.line !== action.payload.line ||
              p.place.column !== action.payload.column
          )
          .map((p) => {
            return { ...p, highlight: false };
          });

        return { ...state, pieces: newPiecesRemoved };
      case "toggleSelectPiece":
        const { column, line, track } = action.payload;
        state.selectedPiece =
          state.selectedPiece?.column === column &&
          state.selectedPiece?.line === line &&
          state.selectedPiece?.track === track
            ? null
            : action.payload;
        return { ...state, selectedPiece: action.payload };
      default:
        return state;
    }
  };

  const initialState: StateProps = {
    turn: ColorEnum.White,
    freePlaces: [],
    selectedPiece: null,
    playType: "place",
    pendingPlacePieces: { [ColorEnum.Black]: 9, [ColorEnum.White]: 9 },
    timer: 15,
    pieces: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleMoveStage = (turn: ColorEnum) => {
    dispatch({ type: "moveStage", payload: turn });
  };

  const handlePlaceStage = (
    turn: ColorEnum,
    pendingPieces: Record<ColorEnum, number>
  ) => {
    dispatch({ type: "placeStage", payload: { turn, pendingPieces } });
  };

  const handleMakePlace = (
    pieceId: string,
    place: [number, number, number],
    color: ColorEnum,
    pendingPieces: Record<ColorEnum, number>
  ) => {
    dispatch({
      type: "makePlace",
      payload: { pieceId, place, pendingPieces, color },
    });
  };

  const handleMakeMove = (from: PlaceProps, to: PlaceProps) => {
    dispatch({ type: "makeMove", payload: { from, to } });
  };

  const handleToggleSelectPiece = (place: PlaceProps) => {
    dispatch({ type: "toggleSelectPiece", payload: place });
  };

  const handleMoinho = (turn: ColorEnum) => {
    dispatch({ type: "removeStage", payload: turn });
  };

  const handleMakeRemove = (
    track: 0 | 1 | 2,
    line: 0 | 1 | 2,
    column: 0 | 1 | 2
  ) => {
    dispatch({ type: "makeRemove", payload: { track, line, column } });
  };

  return {
    timer: state.timer,
    turn: state.turn,
    freePlaces: state.freePlaces,
    selectedPiece: state.selectedPiece,
    playType: state.playType,
    pendingPlacePieces: state.pendingPlacePieces,
    pieces: state.pieces,

    handlePlaceStage,
    handleMoveStage,
    handleMakePlace,
    handleMakeMove,
    handleToggleSelectPiece,
    handleMoinho,
    handleMakeRemove,
  };
}
