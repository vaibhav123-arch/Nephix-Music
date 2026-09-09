import { usePlayer } from "../context/PlayerProvider";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    next,
    previous,
  } = usePlayer();

  if (!currentSong) {
    return null;
  }

  return (
    <div className="player">

      <div>
        <strong>{currentSong.title}</strong>
        <p>{currentSong.artist?.name}</p>
      </div>

      <button onClick={previous}>
        Previous
      </button>

      <button onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button onClick={next}>
        Next
      </button>

    </div>
  );
};

export default Player;