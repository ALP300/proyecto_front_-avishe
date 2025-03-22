import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, completa todos los campos");
      return;
    }

    try {
      const response = await fetch("https://your-api.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales inválidas");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setError(null);
      console.log("Inicio de sesión exitoso:", data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Algo salió mal");
    }
  };

  const handleGuestLogin = () => {
    console.log("Ingresar como invitado");
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <div className="left-section">
        <img src="/images/na-vishe-logo.png" alt="Ña Vishe Logo" />
        <h1>Ña Vishe</h1>
        <p>
          Bienvenido a Ña Vishe <br /> inicia sesión para poder ingresar
        </p>
      </div>
      <div className="right-section">
        <div className="form-container">
          <h2>Iniciar Sesión</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
            <button type="submit">Ingresar</button>
          </form>
          <p className="guest-link" onClick={handleGuestLogin}>
            Ingresar como invitado
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;