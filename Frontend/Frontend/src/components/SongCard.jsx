import { usePlayer } from "../context/PlayerProvider";

const SongCard = ({ song }) => {
  const { play } = usePlayer();

  return (
    <div className="song-card" onClick={() => play(song._id)}>
      <img src={song.coverImage} alt={song.title} />
      <p>{song.title}</p>
      <p>{song.artist?.name}</p>
    </div>
  );
};

export default SongCard;