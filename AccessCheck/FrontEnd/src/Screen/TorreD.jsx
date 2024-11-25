import React, { useState, useEffect } from 'react';
import '../Styles/torres.css';
import Footer from '../Components/Footer';
import HeaderReportes from '../Components/HeaderReportes';
import '@fortawesome/fontawesome-free/css/all.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const TorreDComponent = () => {
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchType, setSearchType] = useState(''); // Estado para rastrear el tipo de búsqueda
  const [searchValue, setSearchValue] = useState(''); // Estado para el valor de entrada de búsqueda
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Estado para controlar la visibilidad de la barra de búsqueda
  

  useEffect(() => {
    // Manejo de desplazamiento
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Mostrar botón de desplazamiento hacia arriba si se ha bajado más de 100px
      setShowScrollUpBtn(scrollY > 100);

      // Mostrar botón de desplazamiento hacia abajo si no se ha llegado al final del documento
      setShowScrollDownBtn(scrollY < documentHeight - windowHeight - 100);
    };

    // Agregar el evento scroll cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Limpiar el evento scroll cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    // Funciones para desplazamiento
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
    setSearchValue(''); // Limpiar la entrada cuando cambia el tipo de búsqueda
    setIsSearchVisible(true); // Mostrar la barra de búsqueda al seleccionar un tipo
  };

  // Función para ocultar la barra de búsqueda
  const hideSearchBar = () => {
    setIsSearchVisible(false);
  };
//modal

const [isModalOpen, setIsModalOpen] = useState(false);
const handleClose =() => setIsModalOpen(false);
const handleOpen =()=> setIsModalOpen (true);

  return (
    <div className="App">
      <HeaderReportes onToggleMenu={handleToggleMenu} />
      <div className={`content-wrapper2 ${isMenuVisible ? 'menu-visible' : ''}`}>
        <header>
          {/* Contenedor blanco que incluye el título y la barra de búsqueda */}
          <div className="white-container">
            <h2 className="center-title">Información de Residentes</h2>
            <div className="search-container">
              <select id="searchOption" className="search-bar" onChange={handleSearchTypeChange}>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="apartment">Buscar por número de apartamento</option>
                <option value="name">Buscar por nombre del residente</option>
              </select>

              {/* Mostrar la barra de búsqueda solo si se selecciona un tipo de búsqueda */}
              {isSearchVisible && (
                <div className="input-with-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type={searchType === 'apartment' ? 'number' : 'text'}
                    id="searchInput"
                    placeholder={searchType === 'apartment' ? "Ingrese el número de apartamento..." : "Ingrese el nombre del residente..."}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)} // Actualizar el valor de entrada
                    className="search-bar"
                    style={{ flex: 1, paddingRight: '30px' }} // Agregar padding para evitar superposición con el ícono
                  />
                  <i className="fas fa-search icon" style={{ marginLeft: '10px' }}></i>
                </div>
              )}

              {/* Botón para ocultar la barra de búsqueda */}
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
        <h1 className="apartment-list-title typing-text">Lista de Apartamentos Torre D</h1>
        <h2 className="access-check-title">Conjunto Residecial Zafiro La Prosperidad</h2>
        <h3 className="access-check-title">Access Check</h3>

        <div className="apartment-list">
  {/* Primer Piso */}
  <div className="floor-container">
    <div className="floor-title">
      <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
        <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Primer Piso
      </h2>
    </div>
    {["101", "102", "103", "104"].map((apt) => (
      <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
      
    ))}
  </div>

  {/* Segundo Piso */}
  <div className="floor-container">
    <div className="floor-title">
    <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
    <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Segundo Piso
      </h2>
    </div>
    {["201", "202", "203", "204"].map((apt) => (
   <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    ))}
  </div>

  {/* Tercer Piso */}
  <div className="floor-container">
    <div className="floor-title">
    <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
    <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Tercer Piso
      </h2>
    </div>
    {["301", "302", "303", "304"].map((apt) => (
   <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    ))}
  </div>

  {/* Cuarto Piso */}
  <div className="floor-container">
    <div className="floor-title">
    <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
    <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Cuarto Piso
      </h2>
    </div>
    {["401", "402", "403", "404"].map((apt) => (
   <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    ))}
  </div>

  {/* Quinto Piso */}
  <div className="floor-container">
    <div className="floor-title">
    <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
    <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Quinto Piso
      </h2>
    </div>
    {["501", "502", "503", "504"].map((apt) => (
   <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    ))}
  </div>

  {/* Sexto Piso */}
  <div className="floor-container">
    <div className="floor-title">
    <h2 className="centered-title" style={{ color: '#6e3f1d' }}>
    <i className="fas fa-building" style={{ color: '#6e3f1d' }}></i> Sexto Piso
      </h2>
    </div>
    {["601", "602", "603", "604"].map((apt) => (
   <div className="apartment" key={apt}>
        <h3 style={{ color: '#6e3f1d' }}>{apt}</h3>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
               Ver más 
              </Button>
              <Modal show={isModalOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles Agendamiento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ul>
          <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
          <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
          <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
          <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
        </ul>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    ))}
  </div>
</div>
</div>

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
  );
};

export default TorreDComponent;