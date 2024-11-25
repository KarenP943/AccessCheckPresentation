import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Asegúrate de importar useNavigate
import '../Styles/InicioVig.css';
import HeaderInAd from '../Components/HeaderInAd';
import Footer from '../Components/Footer';
import TorreA from '../Assets/Img/torreA.png';
import TorreB from '../Assets/Img/torreB.png';
import TorreC from '../Assets/Img/torreC.png';
import Edificio from '../Assets/Img/edificio.png';
import Agenda from '../Assets/Img/agenda.png';
import Reporte from '../Assets/Img/reporte.png';
import NuevoPerfil from '../Assets/Img/nuevoperfil.png';
import Solicitud from '../Assets/Img/solicitud.png';
import '@fortawesome/fontawesome-free/css/all.css';

function InicioAdmin() {
  const [showAlert, setShowAlert] = useState(false);
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);


  // Simular el inicio de sesión exitoso cuando se monta la página
  useEffect(() => {
    setShowAlert(true);
    const timer = setTimeout(() => {
      setShowAlert(false); // La alerta desaparece automáticamente después de 3 segundos
    }, 3000);
    
    // Manejo de desplazamiento
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Mostrar botón de desplazamiento hacia arriba
      setShowScrollUpBtn(scrollY > 100);

      // Mostrar botón de desplazamiento hacia abajo
      setShowScrollDownBtn(scrollY < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => clearTimeout(timer);
  }, []);
  // Funciones para desplazamiento
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };



  return (
    <div className="App">
      <HeaderInAd />
      {showAlert && (
        <div className="alert">
          Inicio de sesión exitoso
        </div>
      )}
      <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>
      <div className="options-container">
        <div className="option">
          <Link to="/TorreA">
            <div className="option-icon">
              <img src={TorreA} alt="Torre A" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Información Torre A</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/TorreB">
            <div className="option-icon">
              <img src={TorreB} alt="Torre B" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Información Torre B</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/TorreC">
            <div className="option-icon">
              <img src={TorreC} alt="Torre C" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Información Torre C</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/TorreD">
            <div className="option-icon">
              <img src={Edificio} alt="Edificio" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Información Torre D</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/VerAgendamiento">
            <div className="option-icon">
              <img src={Agenda} alt="Ver Agendamiento" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Ver Agendamiento</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/VerReportes">
            <div className="option-icon">
              <img src={Reporte} alt="Ver Reportes" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Ver Reportes</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/SolicitudAgendamiento">
            <div className="option-icon">
              <img src={Solicitud} alt="Solicitud Visita" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Solicitud Visita</h2>
            </div>
          </Link>
        </div>
        <div className="option">
          <Link to="/NuevaCuenta">
            <div className="option-icon">
              <img src={NuevoPerfil} alt="Nuevo Perfil" />
            </div>
            <div className="option-text">
            <h2 className="cafe">Nuevo Perfil</h2>
            </div>
          </Link>
        </div>
      </div>    
      <Footer />
      {showScrollDownBtn && (
        <button id="scrollDownBtn" className="scroll-btn" onClick={scrollToBottom}>
          ↓
        </button>
      )}
      {showScrollUpBtn && (
        <button id="scrollUpBtn" className="scroll-btn" onClick={scrollToTop}>
          ↑
        </button>
      )}

    </div>
  );
}

export default InicioAdmin;
