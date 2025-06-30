import React, { useState } from "react";
import { usuarioService } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = ({ setUsuario }) => {
  const [cedula, setCedula] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await usuarioService.obtenerUsuarios();
      const usuarioEncontrado = response.data.find(u => u.cedula === cedula);
      if (usuarioEncontrado) {
        localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
        setUsuario(usuarioEncontrado); // Actualiza estado global en App.js
        navigate("/crear");             // Navega a crear reporte
      } else {
        setError("Cédula no registrada.");
      }
    } catch (err) {
      setError("Error al buscar usuario.");
    }
  };

  return (
    <div className="card p-4 shadow mx-auto" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Iniciar Sesión</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Cédula:</label>
          <input
            type="text"
            className="form-control"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;

