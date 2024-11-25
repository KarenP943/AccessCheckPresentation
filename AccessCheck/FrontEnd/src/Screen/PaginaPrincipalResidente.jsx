import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import HeaderInicioResi from '../Components/HeaderInicioResi';
import '../Styles/App3.css';
import Visitas from '../Assets/Img/visitas.png';
import Historial from '../Assets/Img/historial.png';
import '@fortawesome/fontawesome-free/css/all.css';

const PaginaPrincipalResidente = () => {
  const [showAlert, setShowAlert] = useState(false);

  // Muestra la alerta y la oculta después de 3 segundos
  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Limpia el temporizador cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);


  // Estilo solo para el color café
  const colorCafe = {
    color: '#8B4513', // Color café
  };

  return (
    <div className="App">
      <HeaderInicioResi />
      {showAlert && (
        <div className="alert">
          Inicio de sesión exitoso
        </div>
      )}
      <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>

      <main className="contenido-principal">
        {/* Sección de Vista Previa del Perfil */}


        {/* Sección de opciones de agendamiento */}
        <div className="opciones-agendamiento">
          <div className="tarjeta agendar">
            <h2 style={colorCafe}>Agenda tu visita</h2>
            <p>Realiza un nuevo agendamiento para tu visita.</p>
            <br />
            {/* Contenedor de la imagen centrada */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={Visitas} alt="Visitas" style={{ maxWidth: '30%', height: 'auto' }} />
            </div>
            
            <div className="button-container">
              <Link to="/InicioResi" className="perfil-button">
                <i className="fas fa-calendar-plus" style={{ marginRight: '5px' }}></i>
                Agendar
              </Link>
            </div>
          </div>

          <div className="tarjeta historial">
            <h2 style={colorCafe}>Historial de Agendamientos</h2>
            <p>Revisa tus agendamientos anteriores.</p>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={Historial} alt="Historial" style={{ maxWidth: '28%', height: 'auto' }} />
            </div>
            <div className="button-container">
              <Link to="/HistorialAgendamientos" className="perfil-button">
                <i className="fas fa-history" style={{ marginRight: '5px' }}></i>
                Ver Historial
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaginaPrincipalResidente;
