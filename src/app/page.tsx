"use client";
import { useEffect, useState } from "react";
import createConnection from "@/services/signalRClient";
import { HubConnection } from "@microsoft/signalr";
import Tabuleiro from "./components/board";
import Piece, {PieceProps} from '@/app/components/piece';
import ColorEnum from "@/app/enums/colorEnum";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connection, setConnection] = useState<HubConnection | null>();

  const [pieces, setPieces] = useState<PieceProps>();

  useEffect(() => {
    const newConnection = createConnection(`${process.env.NEXT_PUBLIC_API_URL!}/game`);
    newConnection
      .start()
      .then(() => {
        console.log("connected");

        newConnection.on("ReceiveMessage", (message) => {
          setMessages((messages) => [...messages, message]);
        });
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
    connection!.invoke("JoinRoom", "test");
  };

  const leaveRoom = () => {
    connection!.invoke("LeaveRoom", "test");
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

      {messages.map((message) => (
        <div key={message}>{message}</div>
      ))}
      <Tabuleiro>
        <Piece id="a" color={ColorEnum.Black} cx={100} cy={100} />
        <Piece id="b" color={ColorEnum.White} cx={150} cy={100} />
      </Tabuleiro>
    </main>
  );
}
