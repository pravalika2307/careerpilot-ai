import { useState } from "react";
import api from "../services/api";

export default function Roadmap() {

  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);

  const generate = async () => {

    const res = await api.post("/roadmap", {
      goal
    });

    setResult(res.data);
  };

  return (
    <div style={{ padding: 30 }}>

      <h1>AI Career Roadmap</h1>

      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Google SWE Internship"
      />

      <button onClick={generate}>
        Generate Roadmap
      </button>

      {result && (
        <>
          <h2>{result.goal}</h2>

          <h3>Roadmap</h3>

          <ul>
            {result.roadmap.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>

          <h3>Recommended Projects</h3>

          <ul>
            {result.projects.map((project, i) => (
              <li key={i}>{project}</li>
            ))}
          </ul>

        </>
      )}

    </div>
  );
}