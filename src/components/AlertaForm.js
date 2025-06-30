import React, { useState, useEffect } from 'react';
import { reporteService, categoriaService } from '../services/api';

const AlertaForm = () => {
  const [form, setForm] = useState({
    descripcion: '',
    latitud: null,
    longitud: null,
    usuario: {},
    categoria: { id: '' }
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarCategorias();
    obtenerUbicacion();
  }, []);

  const cargarCategorias = async () => {
    try {
      const response = await categoriaService.obtenerCategorias();
      setCategorias(response.data);
    } catch (err) {
      setMensaje('Error al cargar categorías');
    }
  };

  const obtenerUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setForm((prev) => ({
            ...prev,
            latitud: pos.coords.latitude,
            longitud: pos.coords.longitude
          }));
        },
        () => {
          setMensaje('Error al obtener ubicación');
        }
      );
    } else {
      setMensaje('Geolocalización no soportada');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setForm((prev) => ({
        ...prev,
        categoria: { id: value }
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const enviar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario) {
      setMensaje('Debes iniciar sesión primero');
      setLoading(false);
      return;
    }

    const datos = {
      ...form,
      usuario: { id: usuario.id },
      estado: 'pendiente',
      fecha: new Date().toISOString()
    };

    try {
      await reporteService.crearReporte(datos);
      setMensaje('✅ Reporte enviado correctamente');
      setForm((prev) => ({
        ...prev,
        descripcion: '',
        categoria: { id: prev.categoria.id }
      }));
    } catch (err) {
      setMensaje('❌ Error al enviar reporte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow" style={{ maxWidth: '500px', width: '100%' }}>
      <h4 className="mb-3 text-center">🚨 Crear Alerta</h4>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <form onSubmit={enviar}>
        <div className="mb-3">
          <label className="form-label">Categoría:</label>
          <select
            name="categoria"
            className="form-select"
            value={form.categoria.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.tiposuceso}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="4"
            value={form.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <strong>Ubicación:</strong><br />
          {form.latitud && form.longitud ? (
            <span className="text-muted">
              {Number(form.latitud).toFixed(4)}, {Number(form.longitud).toFixed(4)}
            </span>
          ) : (
            <span className="text-warning">No disponible</span>
          )}
        </div>

        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={obtenerUbicacion}
        >
          🌍 Obtener ubicación
        </button>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Enviar Alerta'}
        </button>
      </form>
    </div>
  );
};

export default AlertaForm;

