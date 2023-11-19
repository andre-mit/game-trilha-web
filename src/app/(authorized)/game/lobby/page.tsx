"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Avatar from "react-nice-avatar";

import { useSignalR } from "@/context/signalR/signalRContext";
import Room from "./components/Room/";
import ColorEnum from "@/enums/colorEnum";
import { useUser } from "@/hooks/useUser";
import { Profile } from "@/@types/profile";
import { Switch } from "@/components/ui/switch";
import truncateText from "@/helpers/truncateText";
import BackButton from "@/app/components/backButton";
import Link from "next/link";
import { GiCrown } from "react-icons/gi";

type RoomType = {
  name: string;
  players: ProfileRoomType[];
  state: RoomState;
};

type ProfileRoomType = Profile & {
  moinho: boolean;
};

enum RoomState {
  Waiting = 0,
  Playing = 1,
  Finished = 2,
}

export default function LobbyPage() {
  const { connection: signalR, connectionId: signalRId } = useSignalR()!;
  const user = useUser.getState();
  const router = useRouter();

  const [rooms, setRooms] = useState<RoomType[]>([] as RoomType[]);
  const joinedAnyRoom = rooms.some(
    (room) => !!room.players.find((x) => x.id === user.id)
  );

  useEffect(() => {
    signalR?.on("PlayerJoined", (gameId: string, player: Profile) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                joined:
                  !!room.players.find((x) => x.id === user.id) ||
                  player.id === user.id,
                players: room.players.concat({ moinho: false, ...player }),
              }
            : { ...room }
        )
      );
    });

    signalR?.on("PlayerLeft", (gameId: string, leftPlayerId: string) => {
      setRooms((rooms) =>
        rooms.map((room) =>
          room.name === gameId
            ? {
                ...room,
                joined:
                  !!room.players.find((x) => x.id === user.id) &&
                  leftPlayerId !== user.id,
                players: room.players.filter(
                  (player) => player.id !== leftPlayerId
                ),
              }
            : { ...room }
        )
      );
    });

    signalR.on(
      "ToggleMoinho",
      (gameId: string, playerId: string, activated: boolean) => {
        setRooms((rooms) =>
          rooms.map((room) =>
            room.name === gameId
              ? {
                  ...room,
                  players: room.players.map((player) => {
                    if (player.id === playerId) {
                      return {
                        ...player,
                        moinho: activated,
                      };
                    }
                    return player;
                  }),
                }
              : { ...room }
          )
        );
      }
    );

    signalR?.on("StartMatch", () => {
      router.push(`/game/play`);
    });

    signalR?.on("GameFinished", (gameId: string) => {
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

    signalR?.on("LobbyStarted", (gameId: string) => {
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

    signalR?.on("LobbyReset", (gameId: string) => {
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
      signalR?.off("PlayerJoined");
      signalR?.off("PlayerLeft");
      signalR?.off("StartGame");
      signalR?.off("GameFinished");
      signalR?.off("LobbyReset");
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
    signalR?.invoke("Join", gameId);
  };

  const leave = (gameId: string) => {
    signalR?.invoke("Leave", gameId);
  };

  const ready = (gameId: string) => {
    signalR?.invoke("Ready", gameId);
  };

  const toggleMoinho = (gameId: string, activated: boolean) => {
    signalR?.invoke("ToggleMoinho", gameId, activated);
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
      <header className="flex justify-between items-center p-4">
        <BackButton />
        <h1 className="text-4xl font-bold">Lobby</h1>
        <Link href="/ranking">
          <GiCrown className="w-24 h-24 fill-yellow-300 hover:fill-yellow-500 transition-colors" />
        </Link>
      </header>
      <main className="rooms flex lg:max-w-[1100px] max-w-[600px] mx-auto my-8 gap-8 flex-shrink flex-wrap">
        {rooms.map(({ name, players, state }) => {
          const disabled = state != RoomState.Waiting || players.length === 2;
          const joined = !!players.find((x) => x.id === user.id);
          const stateColor =
            state == RoomState.Waiting
              ? "waiting"
              : state == RoomState.Playing
              ? "running"
              : "ready";
          return (
            <Room.Root
              color={stateColor}
              key={name}
              className="w-[500px] h-[250px] rounded-xl"
            >
              <header className="flex justify-between">
                <h3 className="">Sala {name}</h3>
                <span>{getStateText(state)}</span>
              </header>

              <Room.RoomContent>
                {players.map((player) => (
                  <div
                    key={`${name}_${player.id}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="flex flex-1 justify-between items-center gap-4">
                      <Avatar className="w-12 h-12" {...player.avatar} />
                      <div className="flex items-end gap-3">
                        <label htmlFor={`moinho-duplo-${name}-${player.id}`}>
                          Moinho duplo
                        </label>
                        <Switch
                          id={`moinho-duplo-${name}-${player.id}`}
                          color="indigo"
                          checked={player.moinho}
                          onCheckedChange={(checked: boolean) => {
                            toggleMoinho(name, checked);
                          }}
                          disabled={player.id != user.id}
                        />
                      </div>
                    </div>
                    <span>{truncateText(player.name, 25)}</span>
                  </div>
                ))}
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
                  <Room.RoomActions>
                    <Room.RoomButton onClick={() => ready(name)} action="ready">
                      Pronto
                    </Room.RoomButton>
                    <Room.RoomButton onClick={() => leave(name)} action="leave">
                      Sair
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
