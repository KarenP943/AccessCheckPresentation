import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Formulario.css';
import Logo from '../Assets/Img/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderIn = () => {
  const navigate = useNavigate();
  return (
    <header className="App">
      <div className="logo">
        <a href="/home">
          <img src={Logo} alt="Logo" />
        </a>
      </div>
      <nav className="menu">
        <ul>
          <li></li>
          <li className="title-container">
            <h1 className="Conjunto-title">Conjunto Residencial Zafiro la Prosperidad</h1>
          </li>
        </ul>
        <div className="buttons">
          <Link to="/Login">
            <button>
              <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i> 
              Iniciar Sesión
            </button>
          </Link>
          <Link to="/Registro">
            <button>
              <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i> 
              Registrarse
            </button>
          </Link>
          <button 
        className="contact-admin-button" 
        onClick={() => navigate(-1)} 
        style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}
      >
        <i className="fas fa-arrow-left"></i> Volver
      </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderIn;
