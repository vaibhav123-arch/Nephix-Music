import { usePlayer } from "../context/usePlayer";
import { useEffect, useState } from "react";
import { getAllAlbums } from "../api/album.api";
import { getAllArtists } from "../api/artist.api";
import { getAllSongs } from "../api/song.api";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import { Play, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { play } = usePlayer();

  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getAllAlbums().then((res) => {
      setAlbums(res.data.data.albums);
    });

    getAllArtists().then((res) => {
      setArtists(res.data.data.artists);
    });

    getAllSongs()
      .then((res) => {
        setSongs(res.data.data.songs);
      })
      .catch((err) => {
        console.log("SONGS ERROR:", err);
      });
  }, []);

  /* GSAP animations */
  useEffect(() => {
  if (songs.length === 0) return;

  const ctx = gsap.context(() => {
    // Hero
    gsap.from(".hero-content > *", {
  opacity: 0,
  y: 25,
  filter: "blur(8px)",
  duration: 0.8,
  stagger: 0.12,
  ease: "power3.out"
});
    gsap.from(".hero-artwork", {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      delay: 0.2,
      ease: "power3.out",
    });
    gsap.to(".hero-artwork", {
  y: -8,
  rotation: 1,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

    // Sections
    gsap.utils.toArray(".home-section").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Prahar cards
    gsap.from(".prahar-card", {
      opacity: 0,
      y: 25,
      scale: 0.96,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".prahar-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Songs
    gsap.from(".song-row", {
      opacity: 0,
      x: -25,
      duration: 0.5,
      stagger: 0.08,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".song-list",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    // Hover animations
    gsap.utils
      .toArray(".prahar-card, .song-row, .grid > *")
      .forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            duration: 0.25,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        });
      });
  });

  return () => ctx.revert();
}, [songs]);
  return (
    <main className="home-page">

      {/* HERO */}
      <section className="hero-section">

        <div className="hero-content">
          <p className="hero-label">
            <Sparkles size={15} />
            DARBAR RHYTHMS
          </p>

          <h1>
            Experience the
            <span className="gold-text"> Mehfil.</span>
          </h1>

          <p className="hero-description">
            Discover timeless Hindustani classical music,
            masterful artists and unforgettable performances.
          </p>

          <button
            className="hero-button"
            onClick={() => songs.length > 0 && play(songs[0]._id)}
          >
            <Play size={17} fill="currentColor" />
            Experience Mehfil
          </button>
        </div>

        <div className="hero-artwork">
          {songs[0] && (
            <img
              src={songs[0].coverimage}
              alt={songs[0].title}
            />
          )}

          <div className="hero-artwork-overlay">
            <p>FEATURED MEHFIL</p>
            <strong>{songs[0]?.title || "Darbar Rhythms"}</strong>
            <span>{songs[0]?.artist?.name || "Sangeet Sabha"}</span>
          </div>
        </div>

      </section>

      {/* ASHTA PRAHAR */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">THE RHYTHMS OF TIME</p>
            <h2>Ashta Prahar</h2>
          </div>
          <span className="section-note">Eight periods · Eight moods</span>
        </div>

        <div className="prahar-grid">
          <div className="prahar-card">
            <span>01</span>
            <strong>Pratah</strong>
            <p>4 AM — 7 AM</p>
          </div>

          <div className="prahar-card">
            <span>02</span>
            <strong>Purvahan</strong>
            <p>7 AM — 10 AM</p>
          </div>

          <div className="prahar-card">
            <span>03</span>
            <strong>Madhyahna</strong>
            <p>10 AM — 1 PM</p>
          </div>

          <div className="prahar-card">
            <span>04</span>
            <strong>Aparahna</strong>
            <p>1 PM — 4 PM</p>
          </div>

          <div className="prahar-card">
            <span>05</span>
            <strong>Sayankala</strong>
            <p>4 PM — 7 PM</p>
          </div>

          <div className="prahar-card">
            <span>06</span>
            <strong>Pradosh</strong>
            <p>7 PM — 10 PM</p>
          </div>

          <div className="prahar-card">
            <span>07</span>
            <strong>Ratri</strong>
            <p>10 PM — 1 AM</p>
          </div>

          <div className="prahar-card">
            <span>08</span>
            <strong>Nishitha</strong>
            <p>1 AM — 4 AM</p>
          </div>
        </div>
      </section>

      {/* RECENT SONGS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">YOUR LISTENING ROOM</p>
            <h2>Recently Experienced Mehfils</h2>
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
                <span>{song.artist?.name}</span>
              </div>

              <span className="song-play">
                <Play size={17} fill="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ARTISTS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">MAESTROS</p>
            <h2>Artists</h2>
          </div>
        </div>

        <div className="grid">
          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              artist={artist}
            />
          ))}
        </div>
      </section>

      {/* ALBUMS */}
      <section className="home-section">
        <div className="section-heading">
          <div>
            <p className="section-kicker">CURATED COLLECTION</p>
            <h2>Master Albums</h2>
          </div>
        </div>

        <div className="grid">
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
            />
          ))}
        </div>
      </section>

    </main>
  );
};

export default Home;