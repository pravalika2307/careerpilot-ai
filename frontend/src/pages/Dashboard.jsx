import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    api.get("/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>CareerPilot AI Dashboard</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: 20
      }}>
        <div className="card">
          <h3>Memories</h3>
          <h2>{stats.memories}</h2>
        </div>

        <div className="card">
          <h3>Cache Hits</h3>
          <h2>{stats.cache_hits}</h2>
        </div>

        <div className="card">
          <h3>Cache Misses</h3>
          <h2>{stats.cache_misses}</h2>
        </div>

        <div className="card">
          <h3>Retrievals</h3>
          <h2>{stats.retrievals}</h2>
        </div>
      </div>
    </div>
  );
}