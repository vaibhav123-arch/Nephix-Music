import { Link } from "react-router-dom";

const ArtistCard = ({ artist }) => (
  <Link to={`/artists/${artist._id}`} className="artist-card">
    <img src={artist.image} alt={artist.name} />
    <p>{artist.name}</p>
  </Link>
);

export default ArtistCard;