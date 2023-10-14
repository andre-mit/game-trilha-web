"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSignalR } from "@/context/signalR/signalRContext";
import Room from "./components/Room/";
import ColorEnum from "@/enums/colorEnum";

type RoomType = {
  name: string;
  players: string[];
  state: RoomState;
};

enum RoomState {
  Waiting = 0,
  Playing = 1,
  Finished = 2,
}

export default function LobbyPage() {
  const { connection: signalR, connectionId: signalRId } = useSignalR()!;
  const router = useRouter();

  const [rooms, setRooms] = useState<RoomType[]>([] as RoomType[]);
  const [moinho, setMoinho] = useState(false);
  const joinedAnyRoom = rooms.some((room) =>
    room.players.includes(signalRId ?? "")
  );

  useEffect(() => {
    signalR.on("PlayerJoined", (gameId: string, connectionId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                joined:
                  room.players.includes(signalRId ?? "") ||
                  connectionId === signalRId,
                players: room.players.concat(connectionId),
              }
            : { ...room }
        )
      );
    });

    signalR.on("PlayerLeft", (gameId: string, connectionId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                joined:
                  room.players.includes(signalRId ?? "") &&
                  connectionId !== signalRId,
                players: room.players.filter(
                  (player) => player !== connectionId
                ),
              }
            : { ...room }
        )
      );
    });

    signalR.on("StartGame", (gameId: string, color: ColorEnum) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                state: RoomState.Playing,
              }
            : { ...room }
        )
      );

      router.push(`/game/${gameId}?color=${color}`);
    });

    signalR.on("GameFinished", (gameId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                state: RoomState.Finished,
                players: [],
              }
            : { ...room }
        )
      );
    });

    signalR.on("LobbyStarted", (gameId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                state: RoomState.Playing,
              }
            : { ...room }
        )
      );
    });

    signalR.on("LobbyReset", (gameId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                state: RoomState.Waiting,
                players: [],
              }
            : { ...room }
        )
      );
    });

    listRooms();

    return () => {
      signalR.off("PlayerJoined");
      signalR.off("PlayerLeft");
      signalR.off("StartGame");
      signalR.off("GameFinished");
      signalR.off("LobbyReset");
    };
  }, [signalR, router, signalRId]);

  const listRooms = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL!}/api/lobby`,
      {
        cache: "no-cache",
      }
    );
    const newRooms = (await response.json()) as RoomType[];
    newRooms.sort((a, b) => parseInt(a.name) - parseInt(b.name));
    setRooms(newRooms);
  };

  const join = (gameId: string) => {
    signalR.invoke("Join", gameId);
  };

  const leave = (gameId: string) => {
    signalR.invoke("Leave", gameId);
  };

  const ready = (gameId: string, moinho: boolean) => {
    signalR.invoke("Ready", gameId, moinho);
  };

  const getStateText = (state: RoomType["state"]) => {
    switch (state) {
      case RoomState.Waiting:
        return "Aguardando";
      case RoomState.Playing:
        return "Em progresso";
      case RoomState.Finished:
        return "Finalizado";
    }
  };

  return (
    <>
      <main className="rooms flex max-w-[1100px] mx-auto my-8 gap-8 flex-shrink flex-wrap">
        {rooms.map(({ name, players, state }) => {
          const disabled = state != RoomState.Waiting || players.length === 2;
          const joined = players.includes(signalR.connectionId ?? "");
          return (
            <Room.Root key={name}>
              <h3>Room {name}</h3>

              <Room.RoomContent>
                <span>{players.length}/2</span>
                <span>{getStateText(state)}</span>
              </Room.RoomContent>

              {!joined ? (
                !joinedAnyRoom && (
                  <Room.RoomActions>
                    <Room.RoomButton
                      onClick={() => join(name)}
                      action="join"
                      disabled={disabled}
                    >
                      {players.length === 2
                        ? "Lotada"
                        : disabled
                        ? "Finalizando"
                        : "Entrar"}
                    </Room.RoomButton>
                  </Room.RoomActions>
                )
              ) : (
                <div className="flex-1 flex flex-col justify-center">
                  <label className="flex gap-4">
                    <span>Moinho</span>
                    <input
                      title="moinho"
                      type="checkbox"
                      checked={moinho}
                      onChange={() => setMoinho(!moinho)}
                    />
                  </label>
                  <Room.RoomActions>
                    <Room.RoomButton
                      onClick={() => ready(name, moinho)}
                      action="ready"
                    >
                      Ready
                    </Room.RoomButton>
                    <Room.RoomButton onClick={() => leave(name)} action="leave">
                      Leave
                    </Room.RoomButton>
                  </Room.RoomActions>
                </div>
              )}
            </Room.Root>
          );
        })}
      </main>
    </>
  );
}
