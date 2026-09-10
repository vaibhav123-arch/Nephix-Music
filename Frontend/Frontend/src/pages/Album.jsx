import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAlbumById } from "../api/album.api";
import { usePlayer } from "../context/usePlayer";
import { Play } from "lucide-react";

const Album = () => {
  const { id } = useParams();
  const { play } = usePlayer();

  const [album, setAlbum] = useState(null);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getAlbumById(id)
      .then((res) => {
        setAlbum(res.data.data.album);
        setSongs(res.data.data.songs);
      })
      .catch((err) => {
        console.log("ALBUM ERROR:", err);
      });
  }, [id]);

  if (!album) {
    return <main className="home-page">Loading album...</main>;
  }

  return (
    <main className="home-page">

      {/* ALBUM HEADER */}
      <section className="home-section">
        <div className="artist-page-header">
          <img
            src={album.coverImage}
            alt={album.title}
          />

          <div>
            <p className="section-kicker">ALBUM</p>
            <h1>{album.title}</h1>
            <p>{album.artist?.name}</p>
          </div>
        </div>
      </section>

      {/* SONGS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">TRACKLIST</p>
            <h2>Songs</h2>
          </div>
        </div>

        <div className="song-list">
          {songs.map((song, index) => (
            <div
              key={song._id}
              className="song-row"
              onClick={() => play(song._id)}
            >
              <span className="song-number">
                {String(index + 1).padStart(2, "0")}
              </span>

              <img
                src={song.coverimage}
                alt={song.title}
              />

              <div className="song-info">
                <strong>{song.title}</strong>
                <span>{album.artist?.name}</span>
              </div>

              <span className="song-play">
                <Play size={17} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Album;