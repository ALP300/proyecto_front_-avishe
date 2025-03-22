import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import naVisheLogo from "../assets/na-vishe-logo.png";
import camerasIcon from "../assets/cameras-icon.png";
import workerIcon from "../assets/worker-icon.png";
import logoutIcon from "../assets/logout-icon.png";
import colmenaImage from "../assets/img_colmena.jpg";
import enVivoIcon from "../assets/en-vivo.png";

const Colmenas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(9);
  const [currentYear, setCurrentYear] = useState(2021);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null); // Controla qué menú está abierto

  // Referencia para detectar clics fuera del menú
  const menuRef = useRef(null);

  const colmenas = [
    { id: "3213", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.2637, lng: -57.5759 },
    { id: "6436", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.3000, lng: -57.6000 },
    { id: "5436", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.2800, lng: -57.5800 },
    { id: "6452", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.2700, lng: -57.5900 },
    { id: "7482", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.2600, lng: -57.5700 },
    { id: "8764", temp: "20°C", humidity: "10%", weight: "20 k", audio: true, image: colmenaImage, lat: -25.2500, lng: -57.5600 },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}&z=15`;
    window.open(url, "_blank");
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleModify = (id) => {
    console.log(`Modificar colmena con ID: ${id}`);
    setOpenMenuId(null); // Cierra el menú
  };

  const handleDelete = (id) => {
    console.log(`Eliminar colmena con ID: ${id}`);
    setOpenMenuId(null); // Cierra el menú
  };

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    setIsCalendarOpen(false);
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, () => null);

  const filteredColmenas = colmenas.filter((colmena) =>
    colmena.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <img src={naVisheLogo} alt="Ña Vishe Logo" className="sidebar-logo" />
          <h1>Ña Vishe</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="active">
              <span className="sidebar-icon">📊</span>
              Dashboard
            </li>
            <hr className="sidebar-divider" />
            <li>
              <span className="sidebar-icon">🐝</span>
              Lista de Colmenas
            </li>
            <hr className="sidebar-divider" />
            <li>
              <img src={camerasIcon} alt="Cameras Icon" className="sidebar-icon" />
              Cámaras
            </li>
            <hr className="sidebar-divider" />
            <li>
              <img src={workerIcon} alt="Worker Icon" className="sidebar-icon" />
              Gestión Trabajador
            </li>
            <hr className="sidebar-divider" />
            <li>
              <span className="sidebar-icon">⚙️</span>
              Configuración
            </li>
            <hr className="sidebar-divider" />
            <li>
              <img src={logoutIcon} alt="Logout Icon" className="sidebar-icon" />
              Cerrar Sesión
            </li>
          </ul>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <header className="header">
          <div className="header-left">
            <h2>
              Gestionar <span>Colmena</span>
            </h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Buscar Colmena"
                value={searchTerm}
                onChange={handleSearch}
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="header-right">
            <span>Leonardo Palomino</span>
            <button className="add-button" onClick={handleOpenModal}>
              + Agregar
            </button>
          </div>
        </header>

        <div className="colmenas-grid">
          {filteredColmenas.length > 0 ? (
            filteredColmenas.map((colmena) => (
              <div key={colmena.id} className="colmena-card">
                <div className="colmena-header">
                  <span>N° - {colmena.id}</span>
                  <div className="colmena-header-icons">
                    <span
                      className="dropdown-icon"
                      onClick={() => toggleMenu(colmena.id)}
                    >
                      ▼
                    </span>
                    {openMenuId === colmena.id && (
                      <div className="dropdown-menu" ref={menuRef}>
                        <div
                          className="menu-item"
                          onClick={() => handleModify(colmena.id)}
                        >
                          Modificar
                        </div>
                        <div
                          className="menu-item"
                          onClick={() => handleDelete(colmena.id)}
                        >
                          Eliminar
                        </div>
                      </div>
                    )}
                    <img
                      src={enVivoIcon}
                      alt="En Vivo"
                      className="audio-icon"
                      onClick={() => handleOpenGoogleMaps(colmena.lat, colmena.lng)}
                    />
                  </div>
                </div>
                <div className="colmena-image-placeholder">
                  <img
                    src={colmena.image}
                    alt="Colmena"
                    className="colmena-image"
                  />
                </div>
                <div className="colmena-stats">
                  <div className="stat-item">
                    <span className="stat-icon">🌡️</span>
                    <span>{colmena.temp}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">💧</span>
                    <span>{colmena.humidity}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">⚖️</span>
                    <span>{colmena.weight}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No se encontraron colmenas con ese número.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Nueva colmena</h2>
              <button className="modal-close" onClick={handleCloseModal}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Añadir Código</label>
                <input type="text" placeholder="Ingresa el código de la colmena" />
              </div>
              <div className="form-group">
                <label>Fecha de Registro</label>
                <input type="text" placeholder="Ingresa la fecha" />
              </div>
              <div className="form-group">
                <label>Fecha de Instalación</label>
                <div className="date-picker">
                  <input
                    type="text"
                    value={
                      selectedDate
                        ? `${selectedDate.getDate()} de ${
                            months[selectedDate.getMonth()]
                          } ${selectedDate.getFullYear()}`
                        : "Selecciona una fecha"
                    }
                    onClick={toggleCalendar}
                    readOnly
                  />
                  {isCalendarOpen && (
                    <div className="calendar">
                      <div className="calendar-header">
                        <button onClick={handlePrevMonth}>◄</button>
                        <span>{`${months[currentMonth]} ${currentYear}`}</span>
                        <button onClick={handleNextMonth}>►</button>
                      </div>
                      <div className="calendar-body">
                        <div className="calendar-days">
                          <span>M</span>
                          <span>T</span>
                          <span>W</span>
                          <span>T</span>
                          <span>F</span>
                          <span>S</span>
                          <span>S</span>
                        </div>
                        <div className="calendar-dates">
                          {emptyDays.map((_, index) => (
                            <span key={`empty-${index}`} className="empty"></span>
                          ))}
                          {daysArray.map((day) => (
                            <span
                              key={day}
                              className={
                                selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() === currentMonth &&
                                selectedDate.getFullYear() === currentYear
                                  ? "selected"
                                  : ""
                              }
                              onClick={() => handleDateSelect(day)}
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Colmenas;