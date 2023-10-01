import { ComponentProps, useEffect, useRef, useState } from "react";
import { MdPause, MdPlayArrow, MdVolumeDown, MdVolumeOff, MdVolumeUp } from "react-icons/md";

export default function Audio({src, ...rest}: ComponentProps<'audio'>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(15);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef) {
      // audioRef.current!.play();
      audioRef.current!.volume = volume / 100;

      if (volume === 0) setIsMuted(true);
      else setIsMuted(false);
    }
  }, [volume, audioRef]);

  useEffect(() => {
    if (audioRef) {
      if (isPlaying) audioRef.current!.play();
      else audioRef.current!.pause();
    }
  }, [isPlaying, audioRef]);
  return (
    <>
      <div className="group flex flex-row gap-4">
        <button
          className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded p-3 text-2xl"
          onClick={() => setIsMuted((is) => !is)}
        >
          {isMuted ? (
            <MdVolumeOff />
          ) : volume > 50 ? (
            <MdVolumeUp />
          ) : (
            <MdVolumeDown />
          )}
        </button>
        <button
          className="text-slate-900 dark:text-slate-100 text-2xl"
          onClick={() => setIsPlaying((is) => !is)}
        >
          {isPlaying ? <MdPause /> : <MdPlayArrow />}
        </button>
        <div className="controls hidden flex-col justify-center items-center group-hover:flex transition-all">
          <input
            className="w-40 h-4 bg-slate-100 dark:bg-slate-700 accent-slate-700 dark:accent-slate-100 rounded-full appearance-none cursor-pointer"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
      <audio
        ref={audioRef}
        onLoadStart={() => setIsPlaying(true)}
        {...rest}
        className="hidden"
        src={src}
        autoPlay={true}
        controls={true}
        loop={true}
        muted={isMuted}
      />
    </>
  );
}
