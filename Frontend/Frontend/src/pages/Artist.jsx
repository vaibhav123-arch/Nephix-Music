import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistById } from "../api/artist.api";
import { usePlayer } from "../context/usePlayer";
import { Play } from "lucide-react";

const Artist = () => {
  const { id } = useParams();
  const { play } = usePlayer();

  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getArtistById(id)
      .then((res) => {
        setArtist(res.data.data.artist);
        setAlbums(res.data.data.albums);
        setSongs(res.data.data.songs);
      })
      .catch((err) => {
        console.log("ARTIST ERROR:", err);
      });
  }, [id]);

  if (!artist) {
    return <main className="home-page">Loading artist...</main>;
  }

  return (
    <main className="home-page">

      {/* ARTIST HEADER */}
      <section className="home-section">
        <div className="artist-page-header">
          <img src={artist.image} alt={artist.name} />

          <div>
            <p className="section-kicker">ARTIST</p>
            <h1>{artist.name}</h1>

            {artist.bio && <p>{artist.bio}</p>}
            {artist.genre && <p>{artist.genre}</p>}
          </div>
        </div>
      </section>

      {/* SONGS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">MUSIC</p>
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
                <span>{song.album?.title}</span>
              </div>

              <span className="song-play">
                <Play size={17} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ALBUMS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">COLLECTION</p>
            <h2>Albums</h2>
          </div>
        </div>

        <div className="grid">
          {albums.map((album) => (
            <div key={album._id}>
              <img
                src={album.coverImage}
                alt={album.title}
              />
              <h3>{album.title}</h3>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default Artist;