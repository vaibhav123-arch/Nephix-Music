import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerBar from "./components/PlayerBar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

import Home from "./pages/Home";
import AlbumDetail from "./pages/AlbumDetail";
import ArtistDetail from "./pages/ArtistDetail";
import Search from "./pages/Search";
import RecentlyPlayed from "./pages/RecentlyPlayed";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <p style={{ padding: "2rem" }}>Loading...</p>;

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/albums/:id" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
        <Route path="/artists/:id" element={<ProtectedRoute><ArtistDetail /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/recently-played" element={<ProtectedRoute><RecentlyPlayed /></ProtectedRoute>} />
      </Routes>
      {user && <PlayerBar />}
    </>
  );
}

export default App;