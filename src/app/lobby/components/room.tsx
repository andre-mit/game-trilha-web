"use client";

import { useState } from "react";

export type RoomProps = {
  name: string;
  players: number;
  status: string;
  joined: boolean;
  join: (gameId: string) => void;
  leave: (gameId: string) => void;
  ready: (gameId: string, moinho: boolean) => void;
};

export default function Room({
  name,
  players,
  status,
  joined,
  join,
  leave,
  ready: handleReady
}: RoomProps) {
  const playing = status === "Playing";
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`room flex flex-col gap-4 p-4 min-w-[250px] rounded-xl ${
        playing ? "bg-green-400" : "bg-slate-500"
      }`}
    >
      <h3 className="">Room {name}</h3>
      <div className="flex-1 flex justify-between">
        <span className="">{players}/2</span>
        <span className="">{status}</span>
      </div>
      {!joined ? (
        <button
          onClick={() => join(name)}
          className="bg-black rounded"
          disabled={playing}
        >
          Join
        </button>
      ) : (
        <div>
          <input
            type="checkbox"
            checked={ready}
            onChange={() => setReady(!ready)}
          />
          <button onClick={() => handleReady(name, ready)} className="bg-black rounded" disabled={playing}>
            Ready
          </button>
          <button onClick={() => leave(name)} className="bg-black rounded" disabled={playing}>
            Leave
          </button>
        </div>
      )}
    </div>
  );
}
