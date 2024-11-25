import React, { useState, useEffect } from 'react';
import '../Styles/App3.css';
import HeaderReportes from '../Components/HeaderReportes';
import Footer from '../Components/Footer';
import Pendiente from '../Assets/Img/pendiente.png';
import Planificacion from '../Assets/Img/planificacion.png';
import Verificado from '../Assets/Img/verificado.png';
import Coche from '../Assets/Img/coche.png';
import Complet from '../Assets/Img/complet.png';
import '@fortawesome/fontawesome-free/css/all.css';
import AgendamientoCard from '../Components/VerAgendamientoCcomponente';
import axios from 'axios';

function VerAgendamiento() {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  
  const [agendamientoData, setAgendamientoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/veragendamientos'); 
        setAgendamientoData(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

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

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchValue(""); 
    setIsSearchVisible(true); // Muestra la barra de búsqueda al seleccionar un tipo
  };

  const handleApartmentInputChange = (e) => {
    const value = e.target.value;
  
    // Permitir solo números y limitar a 3 cifras
    if (/^\d{0,3}$/.test(value)) {
      setSearchValue(value);
    }
  };

  const hideSearchBar = () => {
    setIsSearchVisible(false);
  };

 if (loading) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtienen los datos
  }

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>; // Manejo de errores
  }

  return (
    <div>
      <div className="App">
        <HeaderReportes />
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
                  type="text" // Mantener como texto para permitir ceros a la izquierda
                  id="searchInput"
                  placeholder={searchType === 'apartment' ? "Ingrese el número de apartamento..." : "Ingrese el nombre del residente..."}
                  value={searchValue}
                  onChange={searchType === 'apartment' ? handleApartmentInputChange : (e) => setSearchValue(e.target.value)}
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
        <h1 className="apartment-list-title typing-text">Ver Agendamientos</h1>
        <h2 className="access-check-title">Conjunto Residencial Zafiro La Prosperidad</h2>
        <h3 className="access-check-title">Access Check</h3>
        <div className="summary" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', backgroundColor: 'white', boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
          <div className="summary-item">
            <h3>Visitas Programadas</h3>
            <p>10</p>
            <div className="option-icon">
              <img src={Planificacion} alt="Visitas Programadas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Pendientes</h3>
            <p>6</p>
            <div className="option-icon">
              <img src={Pendiente} alt="Visitas Pendientes" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Activas</h3>
            <p>6</p>
            <div className="option-icon">
              <img src={Verificado} alt="Visitas Activas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Visitas Completadas</h3>
            <p>4</p>
            <div className="option-icon">
              <img src={Complet} alt="Visitas Completadas" />
            </div>
          </div>
          <div className="summary-item">
            <h3>Vehículos Registrados</h3>
            <p>5</p>
            <div className="option-icon">
              <img src={Coche} alt="coche" />
            </div>
          </div>
        </div>
        <br />
       
       
        <div className="apartment-list" style={{ maxWidth: '1090px', margin: '0 auto', padding: '50px 100px 100px 100px' }}>
  {agendamientoData.length > 0 ? (
    agendamientoData
      .filter((data) => {
        if (searchType === 'apartment') {
          return data.apartamento.toString() === searchValue; // Filtrar por número de apartamento
        } else if (searchType === 'name') {
          return (data.nombreUsuario || '').toLowerCase().includes(searchValue.toLowerCase()); // Filtrar por nombre
        }
        return true; // Si no hay tipo de búsqueda, mostrar todos
      })
      .map((data) => <AgendamientoCard key={data.idAgendamiento} data={data} />)
  ) : (
    <p>No hay agendamientos disponibles.</p>
  )}
</div>



        <br />
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
    </div>
  );
};

export default VerAgendamiento;