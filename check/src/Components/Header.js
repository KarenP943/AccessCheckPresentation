import React from 'react';
import '../Styles/Formulario.css';
import Logo from '../Assets/Img/logo.png';
import '@fortawesome/fontawesome-free/css/all.css';
function Header() {

    return (
      <header className="App-header">
        <div className="logo">
            <img src={Logo} alt="Logo" />
        </div>
        
        <nav className="menu">
        <ul>
          <li></li>
          <li className="title-container">
            <h1 className="Conjunto-title">Conjunto Residencial Zafiro la Prosperidad</h1>
          </li>
        </ul>
        </nav>
      </header>
    );
  }

export default Header;