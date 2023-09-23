"use client";
import { useEffect, useState } from "react";
import createConnection from "@/services/signalRClient";
import { HubConnection } from "@microsoft/signalr";
import Board from "../components/board/board";
import Piece, { PieceProps, PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/app/enums/colorEnum";
import { getPlaces } from "@/app/helpers/placesVerification";

export default function Game() {
  const color = ColorEnum.Black;
  const [connection, setConnection] = useState<HubConnection>(
    createConnection(`${process.env.NEXT_PUBLIC_API_URL!}/game`)
  );
  const [turn, setTurn] = useState(false);
  const [freePlaces, setFreePlaces] = useState<PlaceProps[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<PlaceProps | null>(null);

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

  // prevent exit game
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

  // SignalR
  useEffect(() => {
    connection
      .start()
      .then(() => {
        connection.on("Move", (from: number[], to: number[]) => {
          move(
            { track: from[0], line: from[1], column: from[2] } as PlaceProps,
            { track: to[0], line: to[1], column: to[2] } as PlaceProps
          );
        });
        return () => {
          connection.stop();
        };
      })
      .catch((err) => {
        console.error("Socket error", err);
      });
  }, []);

  useEffect(() => {
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

    connection.invoke("Move", fromData, toData);
  };

  return (
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
  );
}
