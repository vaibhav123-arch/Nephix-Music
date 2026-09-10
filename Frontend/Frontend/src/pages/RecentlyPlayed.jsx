import { useEffect, useState } from "react";
import {
  getRecentlyPlayed,
  clearHistory,
} from "../api/history.api";

import SongCard from "../components/SongCard";
import YouTubePlayer from "../components/YoutubePlayer";

const RecentlyPlayed = () => {
  const [history, setHistory] = useState([]);
  const [selectedYouTubeSong, setSelectedYouTubeSong] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getRecentlyPlayed();
        console.log("RECENTLY PLAYED DATA:", res.data);
       setHistory(res.data.data.history || []);
      } catch (error) {
        console.error("Recently Played Error:", error);
      }
    };

    fetchHistory();
  }, []);

  const handleClear = async () => {
    try {
      await clearHistory();
      setHistory([]);
    } catch (error) {
      console.error("Clear History Error:", error);
    }
  };

  return (
    <div className="recently-played-page">

      <div className="page-header">
        <h2>Recently Played</h2>

        <button onClick={handleClear}>
          Clear History
        </button>
      </div>

      <div className="grid">

        {history.map((entry) => {

          {/* NORMAL SONG */}
          if (entry.song) {
            return (
              <SongCard
                key={entry._id}
                song={entry.song}
              />
            );
          }

          {/* YOUTUBE SONG */}
          if (entry.youtubeVideoId) {
            const youtubeSong = {
              videoId: entry.youtubeVideoId,
              title: entry.youtubeTitle,
              channel: entry.youtubeChannel,
              thumbnail: entry.youtubeThumbnail,
            };

            return (
              <div
                key={entry._id}
                className="song-card"
                onClick={() =>
                  setSelectedYouTubeSong(youtubeSong)
                }
              >
                <img
                  src={entry.youtubeThumbnail}
                  alt={entry.youtubeTitle}
                />

                <p>{entry.youtubeTitle}</p>

                <p>{entry.youtubeChannel}</p>
              </div>
            );
          }

          return null;
        })}

      </div>

      {selectedYouTubeSong && (
        <YouTubePlayer
          song={selectedYouTubeSong}
        />
      )}

    </div>
  );
};

export default RecentlyPlayed;