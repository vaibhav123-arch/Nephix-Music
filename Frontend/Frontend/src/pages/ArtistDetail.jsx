import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArtistById } from "../api/artist.api";
import AlbumCard from "../components/AlbumCard";

const ArtistDetail = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getArtistById(id).then((res) => {
      setArtist(res.data.data.artist);
      setAlbums(res.data.data.albums);
    });
  }, [id]);

  if (!artist) return <p>Loading...</p>;

  return (
    <div className="artist-detail-page">
      <img src={artist.image} alt={artist.name} />
      <h2>{artist.name}</h2>
      <p>{artist.bio}</p>

      <h3>Albums</h3>
      <div className="grid">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default ArtistDetail;