"use client";
import { useEffect, useRef, useState } from "react";
import createConnection from "@/services/signalRClient";
import { HubConnection } from "@microsoft/signalr";
import Board, { BoardPositions } from "../components/board";
import Piece, { PieceProps, Place } from "@/app/components/piece";
import ColorEnum from "@/app/enums/colorEnum";
import { getPlaces } from "@/app/helpers/placesVerification";

export default function Game() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>();
  const [turn, setTurn] = useState(false);
  const [to, setTo] = useState<string>("");

  const [pieces, setPieces] = useState<PieceProps[]>([
    {
      id: "1234",
      color: ColorEnum.Black,
      place: { track: 0, line: 0, column: 0 } as Place,
      onSelect: select,
    },
    {
      id: "1235",
      color: ColorEnum.White,
      place: { track: 0, line: 0, column: 1 } as Place,
      onSelect: select,
    },
  ]);

  const [opponentPieces, setOpponentPieces] = useState<PieceProps[]>([]);

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

  useEffect(() => {
    const newConnection = createConnection(
      `${process.env.NEXT_PUBLIC_API_URL!}/game`
    );
    newConnection
      .start()
      .then(() => {
        console.log("connected");

        newConnection.on("ReceiveMessage", (message) => {
          setMessages((messages) => [...messages, message]);
        });

        newConnection.on("Start", onStartGame);

        setConnection(newConnection);

        return () => {
          newConnection.stop();
          connection?.stop();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const joinRoom = () => {
    connection!.invoke("Join", "test");
  };

  const leaveRoom = () => {
    connection!.invoke("Leave", "test");
  };

  const onStartGame = (data: any) => {
    console.log(data);
  };

  const invokeStart = () => {
    connection!.invoke("Start", "test");
  };

  function select(e: Place) {
    let freePlaces = [] as Place[];
    const { track, line, column } = e;
    const places = getPlaces(track, line, column);

    places.forEach((place) => {
      let piece = pieces.find(
        (p) =>
          p.place.track === place.track &&
          p.place.line === place.line &&
          p.place.column === place.column
      );

      if (!piece) {
        piece = opponentPieces.find(
          (p) =>
            p.place.track === place.track &&
            p.place.line === place.line &&
            p.place.column === place.column
        );
        if (!piece)
          freePlaces.push({
            track: place.track as 0 | 1 | 2,
            line: place.line as 0 | 1 | 2,
            column: place.column as 0 | 1 | 2,
          });
      }
    });

    console.log(freePlaces);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={joinRoom}
      >
        Join Room
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={leaveRoom}
      >
        Leave Room
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={invokeStart}
      >
        Start
      </button>

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

      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
      <Board>
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
