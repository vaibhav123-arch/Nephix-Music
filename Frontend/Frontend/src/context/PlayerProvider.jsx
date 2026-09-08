import { useContext, useRef, useState } from "react";

import { PlayerContext } from "./PlayerContext";

import {
  playSong,
  getNextSong,
  getPreviousSong,
} from "../api/song.api";

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(new Audio());

  const loadAndPlay = (song) => {
    setCurrentSong(song);

    audioRef.current.src = song.fileUrl;

    audioRef.current.play();

    setIsPlaying(true);
  };

  const play = async (songId) => {
    const res = await playSong(songId);

    loadAndPlay(res.data.data.song);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const next = async () => {
    if (!currentSong) return;

    const res = await getNextSong(currentSong._id);

    await play(res.data.data.song._id);
  };

  const previous = async () => {
    if (!currentSong) return;

    const res = await getPreviousSong(currentSong._id);

    await play(res.data.data.song._id);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        play,
        togglePlayPause,
        next,
        previous,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);