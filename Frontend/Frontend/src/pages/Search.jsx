import { useEffect, useState } from "react";

import {
  searchSongs,
  searchAlbums,
  searchArtists,
  searchSuggestions,
} from "../api/search.api";

import { searchYouTube } from "../api/youtube.api";

import { addYouTubeRecentlyPlayed } from "../api/history.api";

import { usePlayer } from "../context/usePlayer";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [youtubeSongs, setYoutubeSongs] = useState([]);

  // Suggestions
  const [suggestions, setSuggestions] = useState({
    songs: [],
    albums: [],
    artists: [],
  });

  const [showSuggestions, setShowSuggestions] = useState(false);

  const { play, playYouTube } = usePlayer();

  // Get suggestions while typing
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions({
        songs: [],
        albums: [],
        artists: [],
      });

      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await searchSuggestions(query);

        const data = response.data.data;

        setSuggestions({
          songs: data.songs || [],
          albums: data.albums || [],
          artists: data.artists || [],
        });

        setShowSuggestions(true);
      } catch (error) {
        console.error("Suggestions failed:", error);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    setShowSuggestions(false);
    setSearchQuery(query);

    try {
      const [musicResponse, youtubeResponse] =
        await Promise.all([
          searchSongs(query),
          searchYouTube(query),
        ]);

      const data = musicResponse.data.data;

      setSongs(data.songs || []);
      setAlbums(data.albums || []);
      setArtists(data.artists || []);

      setYoutubeSongs(
        youtubeResponse.data.data.songs || []
      );
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const playYouTubeSong = async (song) => {
    try {
      playYouTube(song);

      await addYouTubeRecentlyPlayed(song);
    } catch (error) {
      console.error(
        "Failed to save YouTube recently played:",
        error
      );
    }
  };

  const selectSuggestion = (text) => {
    setQuery(text);
    setShowSuggestions(false);
  };

  const hasSuggestions =
    suggestions.songs.length > 0 ||
    suggestions.albums.length > 0 ||
    suggestions.artists.length > 0;

  const hasResults =
    songs.length > 0 ||
    albums.length > 0 ||
    artists.length > 0 ||
    youtubeSongs.length > 0;

  return (
    <div
      style={{
        marginLeft: "240px",
        padding: "30px",
      }}
    >
      {/* Search form */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "300px",
          }}
        >
          <input
            type="text"
            placeholder="Search songs, albums, artists..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              if (hasSuggestions) {
                setShowSuggestions(true);
              }
            }}
            style={{
              padding: "12px",
              width: "100%",
              boxSizing: "border-box",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          {/* Suggestions dropdown */}
          {showSuggestions && hasSuggestions && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.15)",
                zIndex: 2000,
                overflow: "hidden",
              }}
            >
              {/* Songs suggestions */}
              {suggestions.songs.map((song) => (
                <div
                  key={song._id}
                  onClick={() =>
                    selectSuggestion(song.title)
                  }
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <strong>{song.title}</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    Song
                  </div>
                </div>
              ))}

              {/* Artists suggestions */}
              {suggestions.artists.map((artist) => (
                <div
                  key={artist._id}
                  onClick={() =>
                    selectSuggestion(artist.name)
                  }
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                    borderBottom:
                      "1px solid #eee",
                  }}
                >
                  <strong>{artist.name}</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    Artist
                  </div>
                </div>
              ))}

              {/* Albums suggestions */}
              {suggestions.albums.map((album) => (
                <div
                  key={album._id}
                  onClick={() =>
                    selectSuggestion(album.title)
                  }
                  style={{
                    padding: "10px 12px",
                    cursor: "pointer",
                  }}
                >
                  <strong>{album.title}</strong>

                  <div
                    style={{
                      fontSize: "12px",
                      color: "#888",
                    }}
                  >
                    Album
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Search query */}
      {searchQuery && hasResults && (
        <h2 style={{ marginBottom: "25px" }}>
          {searchQuery}
        </h2>
      )}

      {/* Songs */}
      {songs.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {songs.map((song) => (
              <div key={song._id}>
                <img
                  src={song.coverImage}
                  alt={song.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3>{song.title}</h3>

                <button
                  onClick={() => play(song._id)}
                >
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Albums */}
      {albums.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {albums.map((album) => (
              <div key={album._id}>
                <img
                  src={album.coverImage}
                  alt={album.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3>{album.title}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Artists */}
      {artists.length > 0 && (
        <div style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {artists.map((artist) => (
              <div key={artist._id}>
                <img
                  src={artist.image}
                  alt={artist.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3>{artist.name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* YouTube */}
      {youtubeSongs.length > 0 && (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "20px",
            }}
          >
            {youtubeSongs.map((song) => (
              <div key={song.videoId}>
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                <h3>{song.title}</h3>

                <p
                  style={{
                    color: "#888",
                    fontSize: "14px",
                  }}
                >
                  {song.channel}
                </p>

                <button
                  onClick={() =>
                    playYouTubeSong(song)
                  }
                >
                  ▶ Play
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {searchQuery && !hasResults && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;