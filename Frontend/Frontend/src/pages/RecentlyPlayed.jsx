import { useEffect, useState } from "react";
import { getRecentlyPlayed, clearHistory } from "../api/history.api";
import SongCard from "../components/SongCard";

const RecentlyPlayed = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await getRecentlyPlayed();
      setHistory(res.data.data.history);
    };

    fetchHistory();
  }, []);

  const handleClear = async () => {
    await clearHistory();
    setHistory([]);
  };

  return (
    <div className="recently-played-page">
      <div className="page-header">
        <h2>Recently Played</h2>
        <button onClick={handleClear}>Clear History</button>
      </div>

      <div className="grid">
        {history.map((entry) => (
          <SongCard key={entry._id} song={entry.song} />
        ))}
      </div>
    </div>
  );
};

export default RecentlyPlayed;