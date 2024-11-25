import React, { useState, useEffect, useRef } from 'react';
import '../Styles/Formulario.css';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Assets/Img/logo.png';
import Usuario from '../Assets/Img/usuario.png';
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderAdminSol = () => {
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
    

      {/* Top Bar */}
      <div className="iconos-container">
        <div className="icono-container" style={{ display: 'flex' }}>
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
            <li><Link to="/InicioAdmin"><i className="fas fa-home"></i> Inicio</Link></li>
            <li><Link to="inicio_sesion.html"><i className="fas fa-sign-out-alt"></i> Cerrar sesión</Link></li>
          </ul>
        </div>
      )}

      {/* Logo */}
      <div className="logo" style={{ marginRight: 'auto' }}>
        <Link to="/InicioAdmin">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>

      {/* Navigation Links */}

<nav className="menu" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
<ul>
          <li></li>
          <li className="title-container">
            <h1 className="Conjunto-title">Conjunto Residencial Zafiro la Prosperidad</h1>
          </li>
        </ul>
    <li style={{ marginLeft: '10px',marginRight: '100px', display: 'flex', alignItems: 'center' }}>
      <Link to="/PaginaPrincipalResidente" style={{ display: 'flex', alignItems: 'center' }}>
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


</nav>
    </header>
  );
};

export default HeaderAdminSol;
