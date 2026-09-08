import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../api/album.api";
import SongCard from "../components/SongCard";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getAlbumById(id).then((res) => {
      setAlbum(res.data.data.album);
      setSongs(res.data.data.songs);
    });
  }, [id]);

  if (!album) return <p>Loading...</p>;

  return (
    <div className="album-detail-page">
      <img src={album.coverImage} alt={album.title} />
      <h2>{album.title}</h2>
      <p>{album.artist?.name}</p>

      <div className="grid">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default AlbumDetail;