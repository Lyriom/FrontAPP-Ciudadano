import React, { useState } from 'react';
import { usuarioService } from '../services/api';

const RegistroUsuario = ({ onUsuarioCreado }) => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    cedula: '',
    celular: '',
    tipo: 'ciudadano'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await usuarioService.crearUsuario(usuario);
      localStorage.setItem('usuario', JSON.stringify(response.data));
      if (onUsuarioCreado) onUsuarioCreado(response.data);
      alert('✅ Usuario registrado exitosamente');

      setUsuario({
        nombre: '',
        cedula: '',
        celular: '',
        tipo: 'ciudadano'
      });
    } catch (error) {
      setError('❌ Error al registrar usuario: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow">
      <h3>Registro de Usuario</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Completo:</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Cédula:</label>
          <input
            type="text"
            className="form-control"
            name="cedula"
            value={usuario.cedula}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Celular:</label>
          <input
            type="tel"
            className="form-control"
            name="celular"
            value={usuario.celular}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Usuario'}
        </button>
      </form>
    </div>
  );
};

export default RegistroUsuario;
