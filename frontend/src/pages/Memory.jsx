import { useState } from "react";
import api from "../services/api";

export default function Memory() {
  const [query, setQuery] = useState("");
  const [edges, setEdges] = useState([]);

const handleSearch = async () => {
  try {
    const res = await api.post("/search", {
      message: query,
    });

    console.log("API RESPONSE:", res.data);

    setEdges(res.data.edges || []);
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>Memory Explorer</h1>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search memory..."
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <div style={{ marginTop: "20px" }}>
        {edges.map((edge) => (
          <div
            key={edge.edge_uuid}
            style={{
              border: "1px solid gray",
              padding: "12px",
              marginBottom: "10px"
            }}
          >
            {edge.fact}
          </div>
        ))}
      </div>
    </div>
  );
}