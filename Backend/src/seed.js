const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Artist = require("./models/artist.model");
const Album = require("./models/album.model");
const Song = require("./models/song.model");

// SoundHelix provides freely-licensed demo tracks — good for testing playback
const demoAudioUrls = [
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
];

const seed = async () => {
  await connectDB();

  await Song.deleteMany({});
  await Album.deleteMany({});
  await Artist.deleteMany({});

  const artist = await Artist.create({
    name: "Test Artist",
    bio: "A placeholder artist for development testing.",
    image: "https://picsum.photos/seed/artist1/300/300",
    genres: ["Electronic"],
  });

  const album = await Album.create({
    title: "Test Album",
    artist: artist._id,
    coverImage: "https://picsum.photos/seed/album1/300/300",
    releaseDate: new Date("2024-01-01"),
    genre: "Electronic",
  });

  const songs = await Promise.all(
    demoAudioUrls.map((url, index) =>
      Song.create({
        title: `Track ${index + 1}`,
        artist: artist._id,
        album: album._id,
        trackNumber: index + 1,
        duration: 240,
        fileUrl: url,
        coverImage: album.coverImage,
        genre: "Electronic",
      })
    )
  );

  console.log(`Seeded 1 artist, 1 album, ${songs.length} songs`);
  await mongoose.connection.close();
  process.exit(0);
};

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});