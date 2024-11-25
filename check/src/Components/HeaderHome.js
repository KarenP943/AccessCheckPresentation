import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Formulario.css';
import Logo from '../Assets/Img/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderIn = () => {
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
        </div>
      </nav>
    </header>
  );
};

export default HeaderIn;
