import { useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { PieceProps, PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/enums/colorEnum";
import { getAllBoardPlaces, getPlaces } from "@/helpers/placesVerification";
import { fetchWrapper } from "@/services/fetchWrapper";

type StateProps = {
  currentAudio: {
    src: string | undefined;
    count: number;
  };
  turn: ColorEnum;
  freePlaces: PlaceProps[];
  selectedPiece: PlaceProps | null;
  playType: "move" | "place" | "remove";
  pendingPlacePieces: Record<ColorEnum, number>;
  timer: number;
  pieces: PieceProps[];
  opponentLeave: boolean;
  results?: "win" | "lose" | "draw";
  color: ColorEnum;
  gameId: string;
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
    }
  | {
      type: "setResults";
      payload: "win" | "lose" | "draw";
    }
  | {
      type: "opponentLeave";
    }
  | {
      type: "opponentJoin";
    }
  | {
      type: "setGameId";
      payload: string;
    }
  | {
      type: "setColor";
      payload: ColorEnum;
    }
  | {
      type: "setTimer";
      payload: number;
    }
  | {
      type: "setPieces";
      payload: PieceProps[];
    }
  | {
      type: "setPendingPlacePieces";
      payload: Record<ColorEnum, number>;
    };

export default function useGame() {
  useEffect(() => {
    const loadBoard = async () => {
      const token = Cookies.get("auth_token");
      const response = await fetchWrapper<any, string>(
        `games`,
        { method: "GET" },
        token,
        "json"
      );

      console.log(response);

      dispatch({ type: "setGameId", payload: response.data.gameId });
      dispatch({ type: "setColor", payload: response.data.playerColor });
      dispatch({ type: "setPieces", payload: response.data.board });
      dispatch({
        type: "setPendingPlacePieces",
        payload: response.data.pendingPlacePieces,
      });
      dispatch({
        type: "setPendingPlacePieces",
        payload: response.data.pendingPieces,
      });
    };

    loadBoard();
  }, []);

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
    if (turn == state.color) {
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

  const getAvailableRemovePieces = (totalPieces: PieceProps[]) => {
    var opponentPieces = totalPieces.filter((p) => p.color != state.color);
    if (opponentPieces.length <= 3) return opponentPieces.map((p) => p.id);
    // verify moinho
    let pieces = opponentPieces.map((p) => {
      return {
        ...p,
        isMoinho:
          moinhoCrossTrack(totalPieces, p.place.line, p.place.column) ||
          trackHasMoinhoByPosition(
            totalPieces,
            p.place.track,
            p.place.line,
            p.place.column
          ),
      };
    });

    if (pieces.some((p) => !p.isMoinho)) {
      return pieces.filter((p) => !p.isMoinho).map((p) => p.id);
    }

    return pieces.map((p) => p.id);
  };

  const positionsMoinhoCrossTrack: { line: 0 | 1 | 2; column: 0 | 1 | 2 }[] = [
    { line: 0, column: 1 },
    { line: 1, column: 0 },
    { line: 2, column: 1 },
    { line: 1, column: 2 },
  ];

  function moinhoCrossTrack(
    totalPieces: PieceProps[],
    line: 0 | 1 | 2,
    column: 0 | 1 | 2
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
          p.color != state.color
      );
      if (pieces.length === 3) {
        return true;
      }
    }
    return false;
  }

  const trackHasMoinhoByPosition = (
    totalPieces: PieceProps[],
    track: 0 | 1 | 2,
    line: 0 | 1 | 2,
    column: 0 | 1 | 2
  ) => {
    // verify line
    let pieces = totalPieces.filter(
      (p) =>
        p.place.track === track &&
        p.place.line === line &&
        p.color != state.color
    );
    if (pieces.length === 3) {
      return true;
    }

    // verify column
    pieces = totalPieces.filter(
      (p) =>
        p.place.track === track &&
        p.place.column === column &&
        p.color != state.color
    );
    if (pieces.length === 3) {
      return true;
    }

    return false;
  };

  const reducer = (state: StateProps, action: ActionProps): StateProps => {
    let playType: "place" | "move" | "remove" = "place";
    switch (action.type) {
      case "placeStage":
        playType = "place";
        const placeStageResult = placeStage(
          action.payload.turn,
          action.payload.pendingPieces,
          state.pieces
        );

        return { ...state, playType, ...placeStageResult };
      case "moveStage":
        const turn = action.payload;
        playType = "move";
        const timer = 15;
        const freePlaces = [] as PlaceProps[];

        return { ...state, turn, playType, timer, freePlaces };
      case "removeStage":
        const newCurrentAudioRemoveStage = {
          src: "/sons/retirar_disponivel.mp3",
          count: state.currentAudio.count + 1,
        };
        if (action.payload != state.color) return state;

        playType = "remove";
        const availableRemove = getAvailableRemovePieces(state.pieces);

        const piecesHighlight = state.pieces.map((p) => {
          return {
            ...p,
            highlight: availableRemove.includes(p.id),
          };
        });

        return {
          ...state,
          pieces: piecesHighlight,
          playType: playType,
          timer: 15,
          freePlaces: [],
          currentAudio: newCurrentAudioRemoveStage,
        };
      case "makePlace":
        const newCurrentAudioPlace = {
          src: "/sons/posicionar.mp3",
          count: state.currentAudio.count + 1,
        };
        const makePlaceResult = makePlace(action.payload);

        return {
          ...state,
          pendingPlacePieces: makePlaceResult.pendingPlacePieces,
          pieces: [...state.pieces, makePlaceResult.piece],
          currentAudio: newCurrentAudioPlace,
        };
      case "makeMove":
        const newCurrentAudioMove = {
          src: "/sons/movimentacao.mp3",
          count: state.currentAudio.count + 1,
        };
        var newPieces = [...state.pieces];

        var index = newPieces.findIndex(
          (p) =>
            p.place.track == action.payload.from.track &&
            p.place.line == action.payload.from.line &&
            p.place.column == action.payload.from.column
        );

        newPieces[index].place = {
          track: action.payload.to.track,
          line: action.payload.to.line,
          column: action.payload.to.column,
        };

        return {
          ...state,
          pieces: newPieces,
          currentAudio: newCurrentAudioMove,
        };
      case "makeRemove":
        const newCurrentAudioRemove = {
          src: "/sons/retira_peca.mp3",
          count: state.currentAudio.count + 1,
        };
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

        return {
          ...state,
          pieces: newPiecesRemoved,
          currentAudio: newCurrentAudioRemove,
        };
      case "toggleSelectPiece":
        if (state.turn != state.color) return state;
        const { column, line, track } = action.payload;
        const selectedPiece =
          state.selectedPiece?.column === column &&
          state.selectedPiece?.line === line &&
          state.selectedPiece?.track === track
            ? null
            : state.pieces.find(
                (p) =>
                  p.color == state.color &&
                  p.place.track == track &&
                  p.place.column == column &&
                  p.place.line == line
              )?.place ?? null;

        let freeP = [] as PlaceProps[];
        if (!!selectedPiece) {
          const places =
            state.pieces.filter((p) => p.color == state.color).length > 3
              ? getPlaces(track, line, column)
              : getAllBoardPlaces();

          places.forEach((place) => {
            let piece = state.pieces.find(
              (p) =>
                p.place.track === place.track &&
                p.place.line === place.line &&
                p.place.column === place.column
            );
            if (!piece)
              freeP.push({
                track: place.track as 0 | 1 | 2,
                line: place.line as 0 | 1 | 2,
                column: place.column as 0 | 1 | 2,
              });
          });
        }

        return { ...state, selectedPiece, freePlaces: freeP };
      case "setPendingPlacePieces":
        return { ...state, pendingPlacePieces: action.payload };
      case "setPieces":
        return { ...state, pieces: action.payload };
      case "setColor":
        return { ...state, color: action.payload };
      case "setTimer":
        return { ...state, timer: action.payload };
      case "setGameId":
        return { ...state, gameId: action.payload };
      case "setResults":
        return { ...state, results: action.payload };
      case "opponentLeave":
        return { ...state, opponentLeave: true };
      case "opponentJoin":
        return { ...state, opponentLeave: false };
      default:
        return state;
    }
  };

  const initialState: StateProps = {
    currentAudio: { src: undefined, count: 0 },
    turn: ColorEnum.White,
    freePlaces: [],
    selectedPiece: null,
    playType: "place",
    pendingPlacePieces: { [ColorEnum.Black]: 9, [ColorEnum.White]: 9 },
    timer: 15,
    pieces: [],
    opponentLeave: false,
    results: undefined,
    color: ColorEnum.White,
    gameId: "",
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

  const setResults = (results: "win" | "lose" | "draw") => {
    dispatch({ type: "setResults", payload: results });
  };

  const handleOpponentLeave = () => {
    dispatch({ type: "opponentLeave" });
  };

  const handleOpponentJoin = () => {
    dispatch({ type: "opponentJoin" });
  };

  return {
    currentAudio: state.currentAudio,
    timer: state.timer,
    turn: state.turn,
    freePlaces: state.freePlaces,
    selectedPiece: state.selectedPiece,
    playType: state.playType,
    pendingPlacePieces: state.pendingPlacePieces,
    pieces: state.pieces,
    results: state.results,
    opponentLeave: state.opponentLeave,
    myColor: state.color,
    gameId: state.gameId,

    handlePlaceStage,
    handleMoveStage,
    handleMakePlace,
    handleMakeMove,
    handleToggleSelectPiece,
    handleMoinho,
    handleMakeRemove,
    setResults,
    handleOpponentLeave,
    handleOpponentJoin,
  };
}
