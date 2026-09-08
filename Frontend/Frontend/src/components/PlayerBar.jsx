import { usePlayer } from "../context/PlayerProvider";

const PlayerBar = () => {
  const { currentSong, isPlaying, togglePlayPause, next, previous } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="player-bar">
      <img src={currentSong.coverImage} alt={currentSong.title} />
      <div>
        <p>{currentSong.title}</p>
        <p>{currentSong.artist?.name}</p>
      </div>
      <div className="player-controls">
        <button onClick={previous}>Previous</button>
        <button onClick={togglePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default PlayerBar;