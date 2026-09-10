import { useEffect, useRef } from "react";
import {
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";
import gsap from "gsap";
import { usePlayer } from "../context/usePlayer";

const PlayerBar = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    next,
    previous,
    currentTime,
    duration,
    seek,
    setVolume,
  } = usePlayer();

  const playerRef = useRef(null);

  useEffect(() => {
    if (!currentSong || !playerRef.current) return;

    gsap.fromTo(
      playerRef.current,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      }
    );
  }, [currentSong]);

  if (!currentSong) return null;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}`;
  };

  return (
    <div ref={playerRef} className="player-bar">

      {/* SONG INFO */}
      <div className="player-song">
        <img
          src={currentSong.coverimage}
          alt={currentSong.title}
          className="player-cover"
        />

        <div className="player-song-info">
          <p className="player-song-title">
            {currentSong.title}
          </p>

          <p className="player-song-artist">
            {currentSong.artist?.name}
          </p>
        </div>
      </div>

      {/* CENTER CONTROLS */}
      <div className="player-center">

        <div className="player-controls">

          <button onClick={previous} aria-label="Previous">
            <SkipBack size={18} />
          </button>

          <button
            className="player-play"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span
              className={
                isPlaying ? "pause-icon" : "play-icon"
              }
            />
          </button>

          <button onClick={next} aria-label="Next">
            <SkipForward size={18} />
          </button>

        </div>

        {/* PROGRESS */}
        <div className="player-progress">

          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) =>
              seek(Number(e.target.value))
            }
          />

          <span>{formatTime(duration)}</span>

        </div>

      </div>

      {/* VOLUME */}
      <div className="player-volume">

        <Volume2 size={20} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={(e) =>
            setVolume(Number(e.target.value))
          }
          aria-label="Volume"
        />

      </div>

    </div>
  );
};

export default PlayerBar;
