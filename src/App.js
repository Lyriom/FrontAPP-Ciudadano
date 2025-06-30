import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CrearReporte from './pages/CrearReporte';
import VerReportes from './pages/VerReportes';
import Login from './pages/Login';

function App() {
  const [usuario, setUsuario] = React.useState(null);

  React.useEffect(() => {
    const user = localStorage.getItem('usuario');
    if (user) setUsuario(JSON.parse(user));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">AlertaCiudad</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/crear">Crear alerta</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/ver">Ver alertas</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {usuario ? (
                <>
                  <li className="nav-item"><span className="nav-link">👤 {usuario.nombre}</span></li>
                  <li className="nav-item">
                    <button
                      className="btn btn-outline-light btn-sm"
                      onClick={cerrarSesion}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm" to="/login">Iniciar sesión</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/crear"
            element={usuario ? <CrearReporte /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/ver"
            element={usuario ? <VerReportes /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={<Login setUsuario={setUsuario} />}
          />
          {/* Puedes agregar ruta 404 si quieres */}
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
