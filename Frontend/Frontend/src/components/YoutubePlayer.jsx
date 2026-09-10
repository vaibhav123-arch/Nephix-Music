import { useEffect, useRef, useState } from "react";

const YouTubePlayer = ({ song }) => {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!song?.videoId) return;

    setIsReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player || !containerRef.current) {
        return;
      }

      if (playerRef.current) {
        playerRef.current.destroy();
      }

      playerRef.current = new window.YT.Player(containerRef.current, {
        width: "200",
        height: "200",
        videoId: song.videoId,

        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },

        events: {
          onReady: (event) => {
            setIsReady(true);

            setDuration(event.target.getDuration());

            // Start playing automatically
            event.target.playVideo();
          },

          onStateChange: (event) => {
            if (
              event.data ===
              window.YT.PlayerState.PLAYING
            ) {
              setIsPlaying(true);
            }

            if (
              event.data ===
              window.YT.PlayerState.PAUSED
            ) {
              setIsPlaying(false);
            }

            if (
              event.data ===
              window.YT.PlayerState.ENDED
            ) {
              setIsPlaying(false);
              setCurrentTime(0);
            }
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      window.onYouTubeIframeAPIReady = createPlayer;

      const script = document.createElement("script");

      script.src =
        "https://www.youtube.com/iframe_api";

      script.async = true;

      document.body.appendChild(script);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [song?.videoId]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current) {
          setCurrentTime(
            playerRef.current.getCurrentTime()
          );

          setDuration(
            playerRef.current.getDuration()
          );
        }
      }, 500);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleSeek = (event) => {
    const newTime = Number(event.target.value);

    setCurrentTime(newTime);

    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds =
      Math.floor(seconds % 60);

    return `${minutes}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (!song) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "#111",
        borderTop: "1px solid #333",
        padding: "12px 20px",
      }}
    >
      {/* YouTube video */}
      <div
        style={{
          position: "absolute",
          left: "20px",
          bottom: "80px",
          width: "200px",
          height: "200px",
          background: "#000",
        }}
      >
        <div ref={containerRef} />
      </div>

      {/* Player bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Thumbnail */}
        <img
          src={song.thumbnail}
          alt={song.title}
          style={{
            width: "60px",
            height: "60px",
            objectFit: "cover",
            borderRadius: "6px",
          }}
        />

        {/* Song information */}
        <div
          style={{
            width: "220px",
            minWidth: "180px",
          }}
        >
          <strong
            style={{
              display: "block",
              color: "#fff",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {song.title}
          </strong>

          <span
            style={{
              display: "block",
              color: "#999",
              fontSize: "14px",
              marginTop: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {song.channel}
          </span>
        </div>

        {/* Play / Pause */}
        <button
          onClick={togglePlay}
          disabled={!isReady}
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "none",
            cursor: isReady
              ? "pointer"
              : "default",
            background: "#fff",
            color: "#111",
            fontSize: "18px",
            flexShrink: 0,
          }}
        >
          {isPlaying ? "❚❚" : "▶"}
        </button>

        {/* Progress */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <span
            style={{
              color: "#aaa",
              fontSize: "12px",
              minWidth: "35px",
            }}
          >
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            disabled={!isReady}
            style={{
              flex: 1,
              cursor: isReady
                ? "pointer"
                : "default",
            }}
          />

          <span
            style={{
              color: "#aaa",
              fontSize: "12px",
              minWidth: "35px",
            }}
          >
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default YouTubePlayer;