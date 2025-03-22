import React from "react";
import "../index.css"; // Importa el archivo CSS que crearemos

const Colmenas = () => {
  // Datos simulados para las colmenas (puedes reemplazarlos con datos reales de una API)
  const colmenas = [
    { id: "3213", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
    { id: "6436", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
    { id: "5436", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
    { id: "6452", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
    { id: "7482", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
    { id: "8764", temp: "20°C", humidity: "10%", weight: "20 k", audio: true },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="/images/na-vishe-logo.png" alt="Ña Vishe Logo" className="sidebar-logo" />
          <h1>Ña Vishe</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">Dashboard</li>
            <li>Lista de Colmenas</li>
            <li>Cámaras</li>
            <li>Gestión Trabajador</li>
            <li>Configuración</li>
            <li>Cerrar Sesión</li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Encabezado */}
        <header className="header">
          <div className="header-left">
            <h2>Gestionar <span>Colmena</span></h2>
            <div className="search-bar">
              <input type="text" placeholder="Buscar Colmena" />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="header-right">
            <span>Leonardo Palomino</span>
            <button className="add-button">+ Agregar</button>
          </div>
        </header>

        {/* Cuadrícula de colmenas */}
        <div className="colmenas-grid">
          {colmenas.map((colmena) => (
            <div key={colmena.id} className="colmena-card">
              <div className="colmena-header">
                <span>N° - {colmena.id}</span>
                <span className="audio-icon">{colmena.audio ? "🔊" : "🔇"}</span>
              </div>
              <img src="/images/colmena-placeholder.jpg" alt="Colmena" className="colmena-image" />
              <div className="colmena-stats">
                <span>🌡️ {colmena.temp}</span>
                <span>💧 {colmena.humidity}</span>
                <span>⚖️ {colmena.weight}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Colmenas;