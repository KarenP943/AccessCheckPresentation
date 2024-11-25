import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Formulario.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Img/logo.png';
import Vermas from '../Assets/Img/vermas.png';
import Usuario from '../Assets/Img/usuario.png';
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderReportes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactAdminOpen, setContactAdminOpen] = useState(false);
  const [dropdownMenuOpen, setDropdownMenuOpen] = useState(false);
  const dropdownMenuRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      console.log('Evento de clic fuera del menú desplegable');
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setDropdownMenuOpen(false);
      }
    };
  
    if (dropdownMenuOpen) {
      setTimeout(() => {
        document.addEventListener('click', handleDocumentClick);
      }, 100);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }
  
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dropdownMenuOpen]);
  return (
    <header className="App-header">
      {/* Sidebar */}
      <nav className="sidebar menu" id="sidebar" style={{ left: sidebarOpen ? '0px' : '-250px' }}>
        <ul>
          <li>
            <div id="calendarContainer" className="calendar-container"></div>
          </li>
          <li>
            <button
              className="contact-admin-button"
              id="contactAdmin"
              onClick={() => setContactAdminOpen(!contactAdminOpen)}
            >
              <i className="fas fa-envelope"></i> Contactar Administrador
            </button>
          </li>

          {contactAdminOpen && (
            <div id="contactAdminBox" className="contact-admin-box">
              <h2 style={{ color: 'white' }}>¿Desea contactar al administrador por correo?</h2>
              <p>Haga clic en el botón para abrir su cuenta de correo electrónico y enviar un mensaje.</p><br />
              <a href="mailto:administracion@conjuntozafiro.com.co?subject=Consulta&body=Hola,%20me%20gustaría%20informar%20sobre%20el%20siguiente%20incidente:%20%0A%0A[Detalles]%0A%0AGracias.">
                <button className="contact-admin-button">
                  Enviar Correo <i className="fas fa-envelope"></i>
                </button>
              </a>
            </div>
          )}
        </ul>
      </nav>

      {/* Top Bar */}
      <div className="iconos-container">
        <div className="icono-container" style={{ display: 'flex' }}>
          <img
            src={Vermas}
            alt="vermas"
            id="toggleMenu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ cursor: 'pointer' }}
          />
          <img
            ref={userIconRef}
            src={Usuario}
            alt="usuario"
            id="userIcon"
            onClick={() => setDropdownMenuOpen(!dropdownMenuOpen)}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownMenuOpen && (
        <div ref={dropdownMenuRef} id="dropdownMenu" className="dropdown-menu">
          <ul>
            <li><Link to="perfil.html"><i className="fas fa-user-edit"></i> Actualizar Perfil</Link></li>
            <li><Link to="inicioVig.html"><i className="fas fa-home"></i> Inicio</Link></li>
            <li><Link to="inicio_sesion.html"><i className="fas fa-sign-out-alt"></i> Cerrar sesión</Link></li>
          </ul>
        </div>
      )}

      {/* Logo */}
      <div className="logo" style={{ marginRight: 'auto' }}>
        <Link to="/InicioVig">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
<nav className="menu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
  <ul style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginRight: '30px' }}>
    {['A', 'B', 'C', 'D'].map(torre => (
      <li key={torre} style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
        <Link to={`/Torre${torre}`} style={{ display: 'flex', alignItems: 'center' }}>
          <i className="fas fa-building"></i> Torre {torre}
        </Link>
      </li>
    ))}
    <li style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
      <Link to="/InicioVig" style={{ display: 'flex', alignItems: 'center' }}>
        <i className="fas fa-home"></i> Inicio 
      </Link>
      <button 
        className="contact-admin-button" 
        onClick={() => navigate(-1)} 
        style={{ marginLeft: '30px', display: 'flex', alignItems: 'center' }}
      >
        <i className="fas fa-arrow-left"></i> Volver
      </button>
    </li>
  </ul>
</nav>
    </header>
  );
};

export default HeaderReportes;
