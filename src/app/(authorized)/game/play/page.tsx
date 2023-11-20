"use client";
import { useEffect, useRef } from "react";

import Board from "@/app/components/board/board";
import Piece, { PlaceProps } from "@/app/components/board/piece";
import ColorEnum from "@/enums/colorEnum";
import { useSignalR } from "@/context/signalR/signalRContext";
import Audio from "@/app/components/audio";
import useGame from "./useGame";
import PlayerPendingPieces from "@/app/components/board/playerPendingPieces";
import Modal from "@/app/components/modal";
import MatchModalContent from "./components/MatchModalContent";
import { useRouter } from "next/navigation";

export default function Game() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { connection: socketConnection } = useSignalR()!;
  const {
    currentAudio,
    freePlaces,
    pieces,
    playType,
    pendingPlacePieces,
    selectedPiece,
    timer,
    turn,
    results,
    opponentLeave,
    myColor,
    gameId,
    profile,
    opponentProfile,

    handleMakeMove,
    handleMakePlace,
    handleMoveStage,
    handlePlaceStage,
    handleToggleSelectPiece,
    handleMakeRemove,
    handleMoinho,
    setResults,
    handleOpponentLeave,
    handleOpponentJoin,
  } = useGame();

  const router = useRouter();

  const myTurn = turn == myColor;
  const pendingMyPlacePieces = Object.values(pendingPlacePieces ?? [])[
    myColor ?? 0
  ];
  const pendingOpponentPlacePieces = Object.values(pendingPlacePieces ?? [])[
    myColor == 0 ? 1 : 0
  ];

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
    if (audioRef && audioRef.current) {
      audioRef.current?.pause();
      audioRef.current?.load();
      audioRef.current?.play();
    }
  }, [currentAudio]);

  useEffect(() => {
    if (!socketConnection) return;
    socketConnection.on("PlaceStage", handlePlaceStage);

    socketConnection.on("MoveStage", handleMoveStage);

    socketConnection.on("Moinho", handleMoinho);

    socketConnection.on("Move", (from: number[], to: number[]) => {
      handleMakeMove(
        { track: from[0], line: from[1], column: from[2] } as PlaceProps,
        { track: to[0], line: to[1], column: to[2] } as PlaceProps
      );
    });

    socketConnection.on(
      "Place",
      (
        pieceId: string,
        place: number[],
        color: ColorEnum,
        pendingPieces: Record<ColorEnum, number>
      ) => {
        handleMakePlace(
          pieceId,
          place as [number, number, number],
          color,
          pendingPieces
        );
      }
    );

    socketConnection.on("Remove", (place: Array<0 | 1 | 2>) => {
      handleMakeRemove(place[0], place[1], place[2]);
    });

    socketConnection.on("Win", () => {
      setResults("win");
    });

    socketConnection.on("Lose", () => {
      setResults("lose");
    });

    socketConnection.on("Draw", () => {
      setResults("draw");
    });

    socketConnection.on("OpponentLeave", handleOpponentLeave);

    return () => {
      socketConnection.off("Move");
      socketConnection.off("Place");
      socketConnection.off("Remove");
      socketConnection.off("Win");
      socketConnection.off("Lose");
      socketConnection.off("Draw");
      socketConnection.off("Moinho");
      socketConnection.off("MoveStage");
      socketConnection.off("PlaceStage");
      socketConnection.off("OpponentLeave");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketConnection]);

  const handlePlay = (to: PlaceProps) => {
    if (myTurn) {
      if (playType === "move") {
        if (selectedPiece !== null) {
          handleMove(to);
        } else {
          handleToggleSelectPiece(to);
        }
      } else if (playType === "place") {
        handlePlace(to);
      } else if (playType === "remove") {
        handleRemove(to);
      }
    }
  };

  const handleMove = async (to: PlaceProps) => {
    const { column, line, track } = selectedPiece!;
    const fromData = [track, line, column];
    const toData = [to.track, to.line, to.column];
    await socketConnection.invoke("Move", gameId, fromData, toData);
  };

  const handlePlace = async (to: PlaceProps) => {
    const { column, line, track } = to;
    const data = [track, line, column];
    await socketConnection.invoke("Place", gameId, data);
  };

  const handleRemove = async (place: PlaceProps) => {
    const { column, line, track } = place;
    const data = [track, line, column];

    await socketConnection.invoke("Remove", gameId, data);
  };

  const handleExit = async () => {
    await socketConnection.invoke("Leave", gameId);
    router.push("/game/lobby");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="pt-4 px-4 flex flex-col gap-3 sm:gap-0 sm:flex-row items-center justify-between">
        <Audio src="https://gametrilha.blob.core.windows.net/assets/music/mario.mp3" />
        <div className="timer justify-self-end">
          <span
            className={`text-white font-semibold text-md rounded-full px-3 py-1 min-w-full ${
              timer > 5
                ? "bg-green-500 dark:bg-green-400"
                : "bg-red-600 dark:bg-red-500"
            }`}
          >
            {timer} segs
          </span>
        </div>
        <div className="turn">
          <span>{myTurn ? "Sua vez" : "Vez do adversário"}</span>
        </div>
      </header>
      <main className="flex flex-col sm:flex-col lg:flex-row items-center justify-evenly p-4 gap-2 flex-1">
        <audio src={currentAudio.src} ref={audioRef} />
        {!!pendingMyPlacePieces && !!profile && (
          <PlayerPendingPieces
            count={pendingMyPlacePieces}
            profile={profile}
            text="Minhas Peças"
            containerType="my"
            pieceColor={myColor == ColorEnum.White ? "white" : "black"}
          />
        )}
        <Board
          freePlaces={freePlaces ?? []}
          handleMove={handlePlay}
          customBoardProps={profile?.board}
        >
          <filter id="my_skin" x="0%" y="0%" width="100%" height="100%">
            <feImage xlinkHref={profile?.pieces} />
          </filter>
          <filter id="opponent_skin" x="0%" y="0%" width="100%" height="100%">
            <feImage xlinkHref={opponentProfile?.pieces} />
          </filter>

          {pieces.map((piece) => {
            const myPiece = piece.color == myColor;
            const hasSkin = myPiece ? !!profile?.pieces : !!opponentProfile?.pieces;
            const skin = hasSkin ? (myPiece ? "my_skin" : "opponent_skin") : undefined;
            return (
              <Piece
                key={piece.id}
                id={piece.id}
                color={piece.color}
                place={piece.place}
                highlight={piece.highlight}
                skin={skin}
                onSelect={() => handleToggleSelectPiece(piece.place)}
                onRemove={handleRemove}
              />
            );
          })}
        </Board>
        {!!pendingOpponentPlacePieces && opponentProfile && (
          <PlayerPendingPieces
            count={pendingOpponentPlacePieces}
            profile={opponentProfile}
            text={`Peças de ${opponentProfile.name}`}
            containerType="opponent"
            pieceColor={myColor == ColorEnum.White ? "black" : "white"}
          />
        )}
      </main>

      <Modal isOpen={!!results} handleClose={handleExit}>
        <MatchModalContent
          handleClose={handleExit}
          showRematch={!opponentLeave}
          type={results}
        />
      </Modal>
    </div>
  );
}
