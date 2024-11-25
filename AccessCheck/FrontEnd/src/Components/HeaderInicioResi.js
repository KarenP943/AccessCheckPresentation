import React, { useState } from 'react';
import '../Styles/Formulario.css';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Img/logo.png';
import Vermas from '../Assets/Img/vermas.png';
import UserIcon from '../Assets/Img/usuario.png'; // Asegúrate de tener un ícono de usuario
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderResi = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [contactAdminOpen, setContactAdminOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); // Estado para el menú del usuario
  const [logoutMessage, setLogoutMessage] = useState(""); // Estado para el mensaje de cierre de sesión
  const [loading, setLoading] = useState(false); // Estado para el loading

  const user = {
    name: "José Alberto",
    email: "josealberto@correo.com"
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLogout = () => {
    setLoading(true); // Iniciar el loading
    setTimeout(() => {
      setLoading(false); // Detener el loading
      setLogoutMessage("Has cerrado sesión con éxito."); // Mostrar mensaje de éxito
    }, 2000); // Simular un retraso de 2 segundos
  };

  return (
    <>
      <header className="App-header">
        <div className="icono-container" style={{ display: 'flex', alignItems: 'center' }}>
          <img src={Vermas} alt="vermas" id="toggleMenu" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ width: '40px', height: '40px', cursor: 'pointer' }} />
          <div className="user-icon-container" style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
            <img src={UserIcon} alt="Usuario" style={{ width: '40px', height: '40px', cursor: 'pointer' }} onClick={toggleUserMenu} />
            {userMenuOpen && (
              <div className="user-menu">
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
                    <Link to="/Home" className="user-option" onClick={handleLogout}>
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
                <a href="mailto:administracion@conjuntozafiro.com.co?subject=Consulta&body=Hola,%20me%20gustaría%20informar%20sobre%20el%20 siguiente%20incidente:%20%0A%0A[Detalles]%0A%0AGracias.">
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
          <div className="title-container" style={{ marginLeft: '20px' }}>
            <h1 className="Conjunto-title">
              Conjunto Residencial Zafiro la Prosperidad
            </h1>
          </div>
        </nav>
        {logoutMessage && (
          <div className="logout-message">
            <p>{logoutMessage}</p>
          </div>
        )}
        {loading && (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderResi;