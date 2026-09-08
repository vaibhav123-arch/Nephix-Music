import { useEffect, useState } from "react";
import { getAllAlbums } from "../api/album.api";
import { getAllArtists } from "../api/artist.api";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
   getAllAlbums().then((res) => {
  console.log("ALBUMS FROM BACKEND:", res.data.data.albums);
  setAlbums(res.data.data.albums);
});
    getAllArtists().then((res) => setArtists(res.data.data.artists));
  }, []);

  return (
    <div className="home-page">
      <h2>Artists</h2>
      <div className="grid">
        {artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>

      <h2>Albums</h2>
      <div className="grid">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Home;