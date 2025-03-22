import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Colmenas from "./views/Colmenas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Bienvenido a Ña Vishe</div>} />
        <Route path="/colmenas" element={<Colmenas />} />
      </Routes>
    </Router>
  );
}

export default App;