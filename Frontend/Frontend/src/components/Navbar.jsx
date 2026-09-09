import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Home,
  Search,
  Clock3,
  Music2,
  Library,
  Radio,
  LogOut,
  User,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      {/* Logo */}
      <Link to="/" className="sidebar-logo">
        <Music2 size={24} />
        <span>Sangeet Sabha</span>
      </Link>

      {/* Explore */}
      <div className="sidebar-section">
        <p className="sidebar-heading">EXPLORE</p>

        <Link to="/" className="sidebar-link">
          <Home size={19} />
          <span>Explore</span>
        </Link>

        <Link to="/search" className="sidebar-link">
          <Search size={19} />
          <span>Search</span>
        </Link>

        <Link to="/recently-played" className="sidebar-link">
          <Clock3 size={19} />
          <span>Recently Played</span>
        </Link>
      </div>

      {/* Sangeet */}
      <div className="sidebar-section">
        <p className="sidebar-heading">SADHANA & VAULT</p>

        <div className="sidebar-link sidebar-disabled">
          <Music2 size={19} />
          <span>Raagas & Thaats</span>
        </div>

        <div className="sidebar-link sidebar-disabled">
          <Library size={19} />
          <span>Gharanas & Artists</span>
        </div>

        <div className="sidebar-link sidebar-disabled">
          <Library size={19} />
          <span>Master Albums</span>
        </div>

        <div className="sidebar-link sidebar-disabled">
          <Radio size={19} />
          <span>Baithak Live Streams</span>
        </div>
      </div>

      {/* Bottom */}
      <div className="sidebar-bottom">
        <div className="sidebar-user">
          <User size={18} />
          <span>{user?.username}</span>
        </div>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;