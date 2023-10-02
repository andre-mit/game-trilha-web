"use client";
import { useEffect } from "react";
import Board from "../../components/board/board";
import Piece, { PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/enums/colorEnum";
import { useSignalR } from "@/context/signalR/signalRContext";
import Audio from "@/app/components/audio";
import useGame from "./useGame";

export default function Game({
  params,
  searchParams: { color: myColor },
}: {
  params: { id: string };
  searchParams: { color: ColorEnum };
}) {
  const { connection: socketConnection } = useSignalR()!;
  const {
    freePlaces,
    pieces,
    playType,
    pendingPlacePieces,
    selectedPiece,
    timer,
    turn,
    handleMakeMove,
    handleMakePlace,
    handleMoveStage,
    handlePlaceStage,
    handleToggleSelectPiece,
    handleMakeRemove,
    handleMoinho,
  } = useGame(myColor);

  const myTurn = turn == myColor;

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = true;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    socketConnection.on("PlaceStage", handlePlaceStage);

    socketConnection.on("MoveStage", handleMoveStage);

    socketConnection.on("Moinho", handleMoinho);

    socketConnection.on("Move", (from: number[], to: number[]) => {
      handleMakeMove(
        { track: from[0], line: from[1], column: from[2] } as PlaceProps,
        { track: to[0], line: to[1], column: to[2] } as PlaceProps
      );
    });

    socketConnection.on(
      "Place",
      (
        pieceId: string,
        place: number[],
        color: ColorEnum,
        pendingPieces: Record<ColorEnum, number>
      ) => {
        handleMakePlace(
          pieceId,
          place as [number, number, number],
          color,
          pendingPieces
        );
      }
    );

    socketConnection.on("Remove", (place: Array<0 | 1 | 2>) => {
      handleMakeRemove(place[0], place[1], place[2]);
    });

    socketConnection.on("Win", () => {
      alert("Você venceu!");
    });

    socketConnection.on("Lose", () => {
      alert("Você perdeu!");
    });

    return () => {
      socketConnection.off("Move");
      socketConnection.off("Place");
      socketConnection.off("Remove");
      socketConnection.off("Win");
      socketConnection.off("Lose");
      socketConnection.off("Moinho");
      socketConnection.off("MoveStage");
      socketConnection.off("PlaceStage");
    };
  }, []);

  const handlePlay = (to: PlaceProps) => {
    if (myTurn) {
      if (playType === "move") {
        if (selectedPiece !== null) {
          handleMove(to);
        } else {
          handleToggleSelectPiece(to);
        }
      } else if (playType === "place") {
        handlePlace(to);
      } else if (playType === "remove") {
        handleRemove(to);
      }
    }
  };

  const handleMove = async (to: PlaceProps) => {
    const { column, line, track } = selectedPiece!;
    const fromData = [track, line, column];
    const toData = [to.track, to.line, to.column];

    await socketConnection.invoke("Move", params.id, fromData, toData);
  };

  const handlePlace = async (to: PlaceProps) => {
    const { column, line, track } = to;
    const data = [track, line, column];
    await socketConnection.invoke("Place", params.id, data);
  };

  const handleRemove = async (place: PlaceProps) => {
    const { column, line, track } = place;
    const data = [track, line, column];
    console.log("Remove pq?", data);
    await socketConnection.invoke("Remove", params.id, data);
  };

  return (
    <>
      <header className="pt-4 pl-4 pr-4 flex items-center justify-between">
        <Audio src="https://gametrilha.blob.core.windows.net/assets/music/mario.mp3" />
        <div className="timer justify-self-end">
          <span
            className={`text-white font-semibold text-md rounded-full px-3 py-1 min-w-full ${
              timer > 5
                ? "bg-green-500 dark:bg-green-400"
                : "bg-red-600 dark:bg-red-500"
            }`}
          >
            {timer} segs
          </span>
        </div>
        <div className="turn">
          <span>{myTurn ? "Sua vez" : "Vez do adversário"}</span>
          <span>{turn}</span>
        </div>
      </header>
      <div>
        {!!freePlaces &&
          freePlaces.map((place) => (
            <div key={`place-${place.track}${place.line}${place.column}`}>
              <span>{place.track}</span>
              <span>{place.line}</span>
              <span>{place.column}</span>
            </div>
          ))}
      </div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Board freePlaces={freePlaces ?? []} handleMove={handlePlay}>
          {pieces.map((piece) => {
            return (
              <Piece
                key={piece.id}
                id={piece.id}
                color={piece.color}
                place={piece.place}
                highlight={piece.highlight}
                onSelect={() => handleToggleSelectPiece(piece.place)}
                onRemove={handleRemove}
              />
            );
          })}
        </Board>
      </main>
    </>
  );
}
