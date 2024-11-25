import React from 'react';
import '../Styles/Formulario.css';
import Logo from '../Assets/Img/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';

const HeaderIn = () => {
  return (
    <nav className="menu">
      <div className="logo">
        <a href="/home">
          <img src={Logo} alt="Logo" />
        </a>
      </div>
      <ul>
        <li></li>
        <li className="title-container">
          <h1 className="Conjunto-title">Conjunto Residencial Zafiro la Prosperidad</h1>
        </li>
      </ul>
      <div className="buttons">
        <a href="/Login" className="ver-mas-button">
          <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i> 
          Iniciar Sesión
        </a>
      </div>
    </nav>
  );
};

export default HeaderIn;
