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
  const [connection, setConnection] = useState<HubConnection | null>();
  const [turn, setTurn] = useState(false);
  const [to, setTo] = useState<string>("");
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
    const newConnection = createConnection(
      `${process.env.NEXT_PUBLIC_API_URL!}/game`
    );
    newConnection
      .start()
      .then(() => {
        console.log("connected");

        setConnection(newConnection);

        return () => {
          newConnection.stop();
          connection?.stop();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, [connection]);

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
      console.log("freeP", freeP);
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

  const handleMove = (to: PlaceProps) => {
    const { column, line, track } = selectedPiece!;
    const piece = pieces.find(
      (p) =>
        p.place.track === track &&
        p.place.line === line &&
        p.place.column === column
    );
    if (piece) {
      setSelectedPiece(null);
      setPieces(
        (pieces) =>
          [
            ...pieces.filter(
              (p) =>
                p.place.track !== track &&
                p.place.line !== line &&
                p.place.column !== column
            ),
            {
              ...piece,
              place: { track: to.track, line: to.line, column: to.column },
            },
          ] as PieceProps[]
      );
    }
  };

  const update = () => {
    const [track, line, column] = to.split("-").map((p) => parseInt(p));
    const piece = pieces.find((p) => p.id === "1234")!;

    setPieces(
      (pieces) =>
        [
          ...pieces.filter((p) => p.id !== "1234"),
          {
            ...piece,
            place: { track, line, column },
          },
        ] as PieceProps[]
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={update}
      >
        Update
      </button>

      <input
        className="bg-slate-800"
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
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
