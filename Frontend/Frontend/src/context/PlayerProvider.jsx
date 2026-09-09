import { useRef, useState, useEffect } from "react";

import { PlayerContext } from "./PlayerContext";

import {
  playSong,
  getNextSong,
  getPreviousSong,
} from "../api/song.api";

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());
 

  const loadAndPlay = (song) => {
    setCurrentSong(song);

    audioRef.current.src = song.fileurl;

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
  const seek = (time) => {
  audioRef.current.currentTime = time;
  setCurrentTime(time);
};

const setVolume = (value) => {
  audioRef.current.volume = value;
};
useEffect(() => {
  const audio = audioRef.current;

  const updateTime = () => setCurrentTime(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);

  const handleEnded = () => {
  console.log("🔥 SONG ENDED — trying next song");
  next();
};

  audio.addEventListener("timeupdate", updateTime);
  audio.addEventListener("loadedmetadata", updateDuration);
  audio.addEventListener("ended", handleEnded);

  return () => {
    audio.removeEventListener("timeupdate", updateTime);
    audio.removeEventListener("loadedmetadata", updateDuration);
    audio.removeEventListener("ended", handleEnded);
  };
}, [next]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        play,
        togglePlayPause,
        next,
       previous,
       currentTime,
       duration,
       seek,
       setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

