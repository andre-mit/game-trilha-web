"use client";

import { useEffect, useState } from "react";
import { MdFullscreen, MdFullscreenExit } from "react-icons/md";

export default function FullScreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", onFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  //   useEffect(() => {
  //     if (isFullscreen) {
  //       document.documentElement.requestFullscreen();
  //     } else {
  //       document.exitFullscreen();
  //     }
  //   }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="group fixed bottom-0 left-12 p-2 flex flex-row items-end justify-end"
    >
      <div className="text-white shadow-xl flex items-center justify-center p-3 rounded bg-gradient-to-r from-purple-500 to-blue-500 z-50 absolute">
        <span className="whitespace-nowrap">
          {isFullscreen ? (
            <MdFullscreenExit className="w-6 h-6" />
          ) : (
            <MdFullscreen className="w-6 h-6" />
          )}
        </span>
      </div>
    </button>
  );
}
