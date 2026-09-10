import { useRef, useState, useEffect, useCallback } from "react";
import { PlayerContext } from "./PlayerContext";

import {
  playSong,
  getNextSong,
  getPreviousSong,
} from "../api/song.api";

export const PlayerProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [youtubeSong, setYoutubeSong] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(new Audio());

  const loadAndPlay = (song) => {
    setYoutubeSong(null);
    setCurrentSong(song);

    audioRef.current.src = song.fileurl;

    audioRef.current.play();

    setIsPlaying(true);
  };

  const play = async (songId) => {
    const res = await playSong(songId);

    loadAndPlay(res.data.data.song);
  };

  const playYouTube = (song) => {
    audioRef.current.pause();

    setCurrentSong(null);
    setYoutubeSong(song);

    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const togglePlayPause = () => {
    if (youtubeSong) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const next = useCallback(async () => {
    if (!currentSong) return;

    const res = await getNextSong(currentSong._id);

    await play(res.data.data.song._id);
  }, [currentSong]);

  const previous = useCallback(async () => {
    if (!currentSong) return;

    const res = await getPreviousSong(currentSong._id);

    await play(res.data.data.song._id);
  }, [currentSong]);

  const seek = (time) => {
    if (youtubeSong) return;

    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (value) => {
    audioRef.current.volume = value;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
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
        youtubeSong,

        isPlaying,
        play,
        playYouTube,

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

