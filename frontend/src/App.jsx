import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AuditPage from "./pages/AuditPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit/:shareId" element={<AuditPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;