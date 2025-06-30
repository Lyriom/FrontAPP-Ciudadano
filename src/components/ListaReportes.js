import React, { useState, useEffect } from 'react';
import { reporteService, categoriaService } from '../services/api';

const ListaReportes = () => {
  const [reps, setReps] = useState([]); const [cats, setCats] = useState([]);
  const [filtroCat, setFiltroCat] = useState(''); const [filtroEst, setFiltroEst] = useState('');
  const [msg, setMsg] = useState('Cargando reportes...');

  useEffect(() => {
    Promise.all([reporteService.obtenerReportes(), categoriaService.obtenerCategorias()])
      .then(([r1,r2]) => { setReps(r1.data); setCats(r2.data); setMsg(''); })
      .catch(() => setMsg('Error cargando datos'));
  }, []);

  const filtro = () => {
    let arr = reps;
    if (filtroCat) arr = arr.filter(r => r.categoria?.id === +filtroCat);
    if (filtroEst) arr = arr.filter(r => r.estado === filtroEst);
    setReps(arr);
  };

  const abrirMaps = (lat,lng) => window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');

  return (
    <div className="w-100">
      <h4>Reportes</h4>
      <div className="row mb-3">
        <div className="col">
          <select className="form-select" value={filtroCat} onChange={e => setFiltroCat(e.target.value)}>
            <option value="">Todas</option>
            {cats.map(c=> <option key={c.id} value={c.id}>{c.tiposuceso}</option>)}
          </select>
        </div>
        <div className="col">
          <select className="form-select" value={filtroEst} onChange={e => setFiltroEst(e.target.value)}>
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick={filtro}>Filtrar</button>
        </div>
      </div>
      {msg && <p>{msg}</p>}
      <div className="row g-3">
        {reps.map(r => (
          <div key={r.id} className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">#{r.id} - {r.categoria?.tiposuceso}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{new Date(r.fecha).toLocaleString()}</h6>
                <p className="card-text">{r.descripcion}</p>
                <p><strong>Estado:</strong> <span className={`badge ${r.estado==='pendiente'?'bg-warning':'bg-success'}`}>{r.estado}</span></p>
                <button className="btn btn-outline-info btn-sm" onClick={()=> abrirMaps(r.latitud, r.longitud)}>Ver Ubicación</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaReportes;
