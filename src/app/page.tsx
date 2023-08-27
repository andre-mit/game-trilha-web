"use client";
import { useEffect, useState } from "react";
import createConnection from "@/services/signalRClient";
import { HubConnection } from "@microsoft/signalr";
import Board, { BoardPositions } from "./components/board";
import Piece, { PieceProps } from "@/app/components/piece";
import ColorEnum from "@/app/enums/colorEnum";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>();

  const [pieces, setPieces] = useState<PieceProps[]>([]);
  const [opponentPieces, setOpponentPieces] = useState<PieceProps[]>([]);

  const [cx, setCx] = useState<number>(100);
  const [cy, setCy] = useState<number>(100);

  const update = () => {
    const num = cx === 100 ? 200 : 100;
    setCx(num);
  }

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

      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
      <Board>
        <Piece id="a" color={ColorEnum.Black} x={cx} y={cy} />
      </Board>
    </main>
  );
}
