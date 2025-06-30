import React from 'react';
import RegistroUsuario from '../components/RegistroUsuario';

const Home = () => (
  <div className="d-flex flex-column align-items-center">
    <h1 className="mb-4">Bienvenido a Alerta Ciudadana</h1>
    <RegistroUsuario />
  </div>
);

export default Home;
