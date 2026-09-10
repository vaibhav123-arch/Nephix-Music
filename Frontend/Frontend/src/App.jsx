import Artist from "./pages/Artist";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerBar from "./components/PlayerBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { usePlayer } from "./context/usePlayer";

import Login from "./pages/Login";
import Album from "./pages/Album";
import Home from "./pages/Home";
import AlbumDetail from "./pages/AlbumDetail";
import ArtistDetail from "./pages/ArtistDetail";
import Search from "./pages/Search";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import YouTubePlayer from "./components/YoutubePlayer";

function App() {
  const { user, loading } = useAuth();
  const { youtubeSong } = usePlayer();

  if (loading) {
    return <p style={{ padding: "2rem" }}>Loading...</p>;
  }

  return (
    <>
      {user && <Navbar />}

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/albums/:id"
          element={
            <ProtectedRoute>
              <AlbumDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artists/:id"
          element={
            <ProtectedRoute>
              <ArtistDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recently-played"
          element={
            <ProtectedRoute>
              <RecentlyPlayed />
            </ProtectedRoute>
          }
        />

        <Route path="/artists/:id" element={<Artist />} />
        <Route path="/albums/:id" element={<Album />} />
      </Routes>

      {user && <PlayerBar />}

      {user && youtubeSong && (
        <YouTubePlayer song={youtubeSong} />
      )}
    </>
  );
}

export default App;