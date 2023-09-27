"use client";
import { useEffect, useState, useRef } from "react";
import Board from "../../components/board/board";
import Piece, { PieceProps, PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/app/enums/colorEnum";
import { getPlaces } from "@/app/helpers/placesVerification";
import { useSignalR } from "@/context/signalR/signalRContext";
import Audio from "@/app/components/audio";

export default function Game({params}: {params: {id: string}}) {
  const color = ColorEnum.Black;
  const signalR = useSignalR()!;
  const [turn, setTurn] = useState(ColorEnum.White);
  const [freePlaces, setFreePlaces] = useState<PlaceProps[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PlaceProps | null>(null);
  const [timer, setTimer] = useState(15);

  const [pieces, setPieces] = useState<PieceProps[]>([
    {
      id: "1234",
      color: ColorEnum.Black,
      place: { track: 0, line: 0, column: 0 } as PlaceProps,
      onSelect: (p) => toggleSelectPiece(p),
    },
    {
      id: "1235",
      color: ColorEnum.White,
      place: { track: 0, line: 0, column: 1 } as PlaceProps,
      onSelect: (p) => toggleSelectPiece(p),
    },
    {
      id: "1236",
      color: ColorEnum.White,
      place: { track: 1, line: 2, column: 1 } as PlaceProps,
      onSelect: (p) => toggleSelectPiece(p),
    },
  ]);

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
    signalR.on("Move", (from: number[], to: number[]) => {
      move(
        { track: from[0], line: from[1], column: from[2] } as PlaceProps,
        { track: to[0], line: to[1], column: to[2] } as PlaceProps
      );
    });

    return () => {
      signalR.off("Move");
    };
  });

  useEffect(() => {
    startTimer();
    if (selectedPiece !== null) {
      let freeP = [] as PlaceProps[];
      const { track, line, column } = selectedPiece as PlaceProps;
      const places = getPlaces(track, line, column);

      places.forEach((place) => {
        let piece = pieces.find(
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

      setFreePlaces(freeP);
    } else setFreePlaces([]);
  }, [selectedPiece, pieces]);

  const toggleSelectPiece = (e: PlaceProps) => {
    const { column, line, track } = e;
    setSelectedPiece((old) =>
      old?.track === track && old?.column === column && old?.line === line
        ? null
        : e
    );
  };

  const move = (from: PlaceProps, to: PlaceProps) => {
    var newPieces = [...pieces];

    var index = newPieces.findIndex(
      (p) =>
        p.place.track === from.track &&
        p.place.line === from.line &&
        p.place.column === from.column
    );

    newPieces[index].place = {
      track: to.track,
      line: to.line,
      column: to.column,
    };

    setSelectedPiece(null);
    setPieces(newPieces);
  };

  const handleMove = (to: PlaceProps) => {
    const { column, line, track } = selectedPiece!;
    const fromData = [track, line, column];
    const toData = [to.track, to.line, to.column];

    signalR.invoke("Move", params.id, fromData, toData);
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((old) => old - 1);
    }, 1000);
  };

  return (
    <>
      <header className="pt-4 pl-4 pr-4 flex items-center justify-between">
        <Audio src="https://gametrilha.blob.core.windows.net/assets/music/mario.mp3" />
        <div className="timer justify-self-end">
          <span className={`text-white font-semibold text-md rounded-full px-3 py-1 min-w-full ${timer > 5 ? 'bg-green-500 dark:bg-green-400' : 'bg-red-600 dark:bg-red-500'}`}>
            {timer} segs
          </span>
        </div>
        <div className="turn">
          <span>{turn === color ? "Sua vez" : "Vez do adversário"}</span>
        </div>
      </header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Board freePlaces={freePlaces} handleMove={handleMove}>
          {pieces.map((piece) => {
            return (
              <Piece
                key={piece.id}
                id={piece.id}
                color={piece.color}
                place={piece.place}
                onSelect={piece.onSelect}
              />
            );
          })}
        </Board>
      </main>
    </>
  );
}
