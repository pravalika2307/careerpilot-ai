import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Memory from "./pages/Memory";
import Chat from "./pages/Chat";
import Roadmap from "./pages/Roadmap";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "20px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/">Dashboard</Link>
        <Link to="/memory">Memory</Link>
        <Link to="/chat">Career Advisor</Link>
        <Link to="/roadmap">Roadmap</Link>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/roadmap" element={<Roadmap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
