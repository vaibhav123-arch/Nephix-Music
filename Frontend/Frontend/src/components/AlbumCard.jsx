import { Link } from "react-router-dom";

const AlbumCard = ({ album }) => (
  <Link to={`/albums/${album._id}`} className="album-card">
    <img src={album.coverImage} alt={album.title} />
    <p>{album.title}</p>
    <p>{album.artist?.name}</p>
  </Link>
);

export default AlbumCard;