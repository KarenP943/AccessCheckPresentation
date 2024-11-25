import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Formulario.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Img/logo.png';
import Vermas from '../Assets/Img/vermas.png';
import UserIcon from '../Assets/Img/usuario.png'; // Asegúrate de tener un ícono de usuario
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderResi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactAdminOpen, setContactAdminOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para el menú del usuario
  const dropdownMenuRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  const user = {
    name: "José Alberto",
    email: "josealberto@correo.com"
  };

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(event.target) &&
        !userIconRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('click', handleDocumentClick);
    } else {
      document.removeEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [userMenuOpen]);

  return (
    <>
      <header className="App-header">
        <div className="icono-container" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Vermas} alt="vermas" id="toggleMenu" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
          <div className="user-icon-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <img ref={userIconRef} src={UserIcon} alt="Usuario" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={() => setUserMenuOpen(!userMenuOpen)} />
            {userMenuOpen && (
              <div ref={dropdownMenuRef} className="user-menu">
                <div className="user-profile">
                  <h2>Hola, {user.name}!</h2>
                  <p>{user.email}</p>
                </div>
                <ul className="user-options">
                  <li>
                    <Link to="/Perfil" className="user-option">
                      <i className="fas fa-user-edit"></i> Actualizar datos de perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/Home" className="user-option">
                      <i className="fas fa-sign-out-alt"></i> Cerrar sesión
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <nav className="sidebar menu" id="sidebar" style={{ left: sidebarOpen ? '0px' : '-250px' }}>
          <div className="sidebar-header">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="close-button">
              <i className={sidebarOpen ? "fas fa-chevron-left" : "fas fa-chevron-right"}></i>
            </button>
          </div>
          <ul>
            <li>
              <button
                className="contact-admin-button"
                id="contactAdmin"
                onClick={() => setContactAdminOpen(!contactAdminOpen)}
                style={{ cursor: 'pointer' }}
              >
                <i className="fas fa-envelope"></i> Contactar Administrador
              </button>
            </li>
            {contactAdminOpen && (
              <div id="contactAdminBox" className="contact-admin-box">
                <h2 style={{ color: 'white' }}>¿Desea contactar al administrador por correo?</h2>
                <p>Haga clic en el botón para abrir su cuenta de correo electrónico y enviar un mensaje.</p><br />
                <a href="mailto:administracion@conjuntozafiro.com.co?subject=Consulta&body=Hola,%20me%20gustaría%20informar%20sobre%20el %20siguiente%20incidente:%20%0A%0A[Detalles]%0A%0AGracias.">
                  <button className="contact-admin-button">
                    Enviar Correo <i className="fas fa-envelope"></i>
                  </button>
                </a>
              </div>
            )}
            <li>
              <Link to="/TorreA">
                <button className="contact-admin-button">
                  <i className="fas fa-building"></i> Información Torre A
                </button>
              </Link>
            </li>
            <li>
              <Link to="/TorreB">
                <button className="contact-admin-button">
                  <i className="fas fa-building"></i> Información Torre B
                </button>
              </Link>
            </li>
            <li>
              <Link to="/TorreC">
                <button className="contact-admin-button">
                  <i className="fas fa-building"></i> Información Torre C
                </button>
              </Link>
            </li>
            <li>
              <Link to="/TorreD">
                <button className="contact-admin-button ">
                  <i className="fas fa-building"></i> Información Torre D
                </button>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logo">
          <a href="/InicioVig">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <nav className="menu">
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
    </>
  );
};

export default HeaderResi;