import { useState } from "react";
import { searchSongs, searchAlbums, searchArtists } from "../api/search.api";
import SearchBar from "../components/SearchBar";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);

  const handleSearch = async (query) => {
    const [songsRes, albumsRes, artistsRes] = await Promise.all([
      searchSongs({ query }),
      searchAlbums(query),
      searchArtists(query),
    ]);
    setSongs(songsRes.data.data.results);
    setAlbums(albumsRes.data.data.albums);
    setArtists(artistsRes.data.data.artists);
  };

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />

      <h3>Songs</h3>
      <div className="grid">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>

      <h3>Albums</h3>
      <div className="grid">
        {albums.map((album) => (
          <AlbumCard key={album._id} album={album} />
        ))}
      </div>

      <h3>Artists</h3>
      <div className="grid">
        {artists.map((artist) => (
          <ArtistCard key={artist._id} artist={artist} />
        ))}
      </div>
    </div>
  );
};

export default Search;