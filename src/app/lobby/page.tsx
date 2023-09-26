"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { useSignalR } from "@/context/signalR/signalRContext";
import Room from "./components/room";

const roomsBase = [
  {
    name: "1",
    players: 0,
    status: "Waiting",
    joined: false,
  },
  {
    name: "2",
    players: 1,
    status: "Waiting",
    joined: false,
  },
  {
    name: "3",
    players: 2,
    status: "Playing",
    joined: false,
  },
  {
    name: "4",
    players: 0,
    status: "Waiting",
    joined: false,
  },
  {
    name: "5",
    players: 1,
    status: "Waiting",
    joined: false,
  },
  {
    name: "6",
    players: 2,
    status: "Playing",
    joined: false,
  },
];

export default function LobbyPage() {
  const signalR = useSignalR();
  const router = useRouter();

  const [rooms, setRooms] = useState(roomsBase);

  useEffect(() => {
    signalR.on("PlayerJoined", (gameId: string, connectionId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                joined: room.joined || connectionId === signalR.connectionId,
                players: room.players + 1,
              }
            : { ...room }
        )
      );

      signalR.on("PlayerLeft", (gameId: string, connectionId: string) => {
        setRooms((rooms) =>
          rooms.map((room) =>
            room.name === gameId
              ? {
                  ...room,
                  joined: room.joined && connectionId !== signalR.connectionId,
                  players: room.players - 1,
                }
              : { ...room }
          )
        );
      });

      signalR.on("StartGame", (gameId: string) => {
        setRooms((rooms) =>
          rooms.map((room) =>
            room.name === gameId
              ? {
                  ...room,
                  status: "Playing",
                }
              : { ...room }
          )
        );

        router.push(`/game/${gameId}`);
      });

      return () => {
        signalR.off("PlayerJoined");
        signalR.off("PlayerLeft");
        signalR.off("StartGame");
      };
    });
  }, [signalR]);

  const join = (gameId: string) => {
    signalR.invoke("Join", gameId);
  };

  const leave = (gameId: string) => {
    signalR.invoke("Leave", gameId);
  };

  const ready = (gameId: string, moinho: boolean) => {
    signalR.invoke("Ready", gameId, moinho);
  };

  return (
    <>
      <main className="rooms flex max-w-[900px] mx-auto my-8 gap-8 flex-shrink flex-wrap">
        {rooms.map(({ name, players, status, joined }) => (
          <Room
            key={name}
            name={name}
            players={players}
            status={status}
            joined={joined}
            join={join}
            leave={leave}
            ready={ready}
          />
        ))}
      </main>
    </>
  );
}
