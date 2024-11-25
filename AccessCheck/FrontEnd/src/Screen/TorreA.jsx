// src/Screen/TorreA.jsx
import React, { useState, useEffect } from 'react';
import '../Styles/torres.css';
import Footer from '../Components/Footer';
import HeaderReportes from '../Components/HeaderReportes';
import '@fortawesome/fontawesome-free/css/all.css';
import Apartment from '../Components/Apartament';

const TorreAComponent = () => {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setShowScrollUpBtn(scrollY > 100);
      setShowScrollDownBtn(scrollY < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  const handleToggleMenu = (visible) => {
    setIsMenuVisible(visible);
  };

  const handleSearchTypeChange = (event) => {
    setSearchType(event.target.value);
    setSearchValue('');
    setIsSearchVisible(true);
  };

  const hideSearchBar = () => {
    setIsSearchVisible(false);
  };

  return (
    <div className="App">
      <HeaderReportes onToggleMenu={handleToggleMenu} />
      <div className={`content-wrapper2 ${isMenuVisible ? 'menu-visible' : ''}`}>
        <header>
          <div className="white-container">
            <h2 className="center-title">Información de Residentes</h2>
            <div className="search-container">
              <select id="searchOption" className="search-bar" onChange={handleSearchTypeChange}>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="apartment">Buscar por número de apartamento</option>
                <option value="name">Buscar por nombre del residente</option>
              </select>

              {isSearchVisible && (
                <div className="input-with-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type={searchType === 'apartment' ? 'number' : 'text'}
                    id="searchInput"
                    placeholder={searchType === 'apartment' ? "Ingrese el número de apartamento..." : "Ingrese el nombre del residente..."}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="search-bar"
                    style={{ flex: 1, paddingRight: '30px' }}
                  />
                  <i className="fas fa-search icon" style={{ marginLeft: '10px' }}></i>
                </div>
              )}

              {isSearchVisible && (
                <div className="button-container">
                  <button className="ver-mas-button" onClick={hideSearchBar}>
                    Ocultar barra de búsqueda
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <h1 className="apartment-list-title typing-text">Lista de Apartamentos Torre A</h1>
        <h2 className="access-check-title">Conjunto Residencial Zafiro La Prosperidad</h2>
        <h3 className="access-check-title">Access Check</h3>

        <div className="apartment-list">
          {/* Primer Piso */}
          <div className="floor-container">
            <div className="floor-title">
              <h2 className="centered-title" style={{ color: '#6e3f1d' }}>Primer Piso</h2>
            </div>
            <div className="apartments">
              <Apartment number="101" />
              <Apartment number="102" />
              <Apartment number="103" />
              <Apartment number="104" />
            </div>
          </div>

          {/* Segundo Piso */}
          <div className="floor-container">
            <div className="floor-title">
              <h2 className="centered-title" style={{ color: '#6e3f1d' }}>Segundo Piso</h2>
            </div>
            <div className="apartments">
              <Apartment number="201" />
              <Apartment number="202" />
              <Apartment number="203" />
              <Apartment number="204" />
            </div>
          </div>

          {/* Tercer Piso */}
          <div className="floor-container">
            <div className="floor-title">
              <h2 className="centered-title" style={{ color: '#6e3f1d' }}>Tercer Piso</h2>
            </div>
            <div className="apartments">
              <Apartment number="301" />
              <Apartment number="302" />
              <Apartment number="303" />
              <Apartment number="304" />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default TorreAComponent;