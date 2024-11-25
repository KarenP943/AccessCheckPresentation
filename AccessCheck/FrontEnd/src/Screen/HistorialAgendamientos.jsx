import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import '../Styles/App3.css';
import HeaderInicioResi from '../Components/HeaderInicioResi';
import Footer from '../Components/Footer';
import '@fortawesome/fontawesome-free/css/all.css';

const agendamientosData = [
  {
    id: 1,
    fecha: '2024-10-01',
    hora: '10:00 AM',
    estado: 'Activo',
    motivo: 'Visita de mantenimiento',
    detalles: 'El técnico realizará una revisión del sistema de calefacción.',
  },
  {
    id: 2,
    fecha: '2024-10-05',
    hora: '02:00 PM',
    estado: 'Aceptado',
    motivo: 'Visita de familiares',
    detalles: 'Visita de familiares para pasar el fin de semana.',
  },
  {
    id: 3,
    fecha: '2024-10-10',
    hora: '11:00 AM',
    estado: 'Rechazado',
    motivo: 'Visita de amigos',
    detalles: 'La visita fue rechazada por el propietario.',
  },
];

const HistorialAgendamientos = () => {
  const [selectedAgendamiento, setSelectedAgendamiento] = useState(null);
  const [agendamientos, setAgendamientos] = useState(agendamientosData);
  const [editingAgendamiento, setEditingAgendamiento] = useState(null);
  const [formData, setFormData] = useState({ fecha: '', hora: '', motivo: '', detalles: '' });
  const [date, setDate] = useState(new Date());
  const [agendamientoDelDia, setAgendamientoDelDia] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [userName, setUserName] = useState(''); // Estado para el nombre del usuario
  const [greeting, setGreeting] = useState('');
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [searchType, setSearchType] = useState(''); // Estado para rastrear el tipo de búsqueda
  const [searchValue, setSearchValue] = useState(''); // Estado para el valor de entrada de búsqueda
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Estado para controlar la visibilidad de la barra de búsqueda

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hours = new Date().getHours();
    let greetingMessage = '';

    if (hours < 12) {
      greetingMessage = `Buenos días, ${userName}`;
    } else if (hours < 18) {
      greetingMessage = `Buenas tardes, ${userName}`;
    } else {
      greetingMessage = `Buenas noches, ${userName}`;
    }

    setGreeting(greetingMessage);
  }, [userName]); // Actualiza el saludo cuando el nombre del usuario cambie

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Mostrar botón de desplazamiento hacia arriba
      setShowScrollUpBtn(scrollY > 100);

      // Mostrar botón de desplazamiento hacia abajo
      setShowScrollDownBtn(scrollY < documentHeight - windowHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAgendamientoClick = (agendamiento) => {
    setSelectedAgendamiento(agendamiento);
  };

  const closeDetails = () => {
    setSelectedAgendamiento(null);
  };

  const handleToggleMenu = (visible) => {
    setIsMenuVisible(visible);
  };

  const handleEditClick = (agendamiento) => {
    setEditingAgendamiento(agendamiento);
    setFormData({
      fecha: agendamiento.fecha,
      hora: agendamiento.hora,
      motivo: agendamiento.motivo,
      detalles: agendamiento.detalles,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAgendamientos = agendamientos.map((agendamiento) =>
      agendamiento.id === editingAgendamiento.id
        ? { ...agendamiento, ...formData }
        : agendamiento
    );
    setAgendamientos(updatedAgendamientos);
    setEditingAgendamiento(null);
  };

  const handleDateChange = (date) => {
    setDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    const agendamientosDelDia = agendamientos.filter(agendamiento => agendamiento.fecha === formattedDate);
    setAgendamientoDelDia(agendamientosDelDia);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
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

  return (
    <div className="App">
      <HeaderInicioResi  onToggleMenu={handleToggleMenu} />
      <div className={`content-wrapper2 ${isMenuVisible ? 'menu-visible' : ''}`}>
        <header>
          {/* Contenedor blanco que incluye el título y la barra de búsqueda */}
          <div className="white-container">
            <h2 className="center-title">Información de Historial </h2>
            <div className="search-container">
              <select id="searchOption" className="search-bar" onChange={handleSearchTypeChange}>
                <option value="" disabled selected>Selecciona una opción</option>
                <option value="apartment">Buscar por nombre del visitante</option>
                <option value="name">Buscar por fecha de visita</option>
              </select>

              {/* Mostrar la barra de búsqueda solo si se selecciona un tipo de búsqueda */}
              {isSearchVisible && (
                <div className="input-with-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <input
                    type={searchType === 'apartment' ? 'number' : 'text'}
                    id="searchInput"
                    placeholder={searchType === 'apartment' ? "Ingrese el nombre del visitante..." : "Ingrese la fecha de la visita..."}
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
      <div className="historial-agendamientos">
        <h1 className="apartment-list-title typing-text">Historial de Agendamiento</h1>

        {/* Contenedor para el saludo y la hora actual */}
        <div className="greeting-container">
          <h2>{greeting}</h2>
          <h2>Hora Actual: {currentTime}</h2>
        </div>

        <Calendar
          onChange={handleDateChange}
          value={date}
          locale="es-ES"
          firstDayOfWeek={0}
          className="calendar-animation" // Clase para animación
        />

        {agendamientoDelDia.length > 0 ? (
          <div className="agendamiento-container">
            <h2>Agendamientos para {date.toLocaleDateString()}</h2>
            <ul>
              {agendamientoDelDia.map((agendamiento) => (
                <li key={agendamiento.id} className="agendamiento-item">
                  <strong>Hora:</strong> {agendamiento.hora} <br />
                  <strong>Estado:</strong> {agendamiento.estado} <br />
                  <strong>Motivo :</strong> {agendamiento.motivo} <br />
                  <button onClick={() => handleAgendamientoClick(agendamiento)}>Ver Detalles</button>
                  <button onClick={() => handleEditClick(agendamiento)}>Editar</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No hay agendamientos para este día.</p>
        )}

        <ul className="agendamientos-list">
          {agendamientos.map((agendamiento) => (
            <li key={agendamiento.id} className={`agendamiento-item ${agendamiento.estado.toLowerCase()}`}>
              <div>
                <strong>Fecha:</strong> {agendamiento.fecha} <br />
                <strong>Hora:</strong> {agendamiento.hora} <br />
                <strong>Estado:</strong> {agendamiento.estado} <br />
                <strong>Motivo:</strong> {agendamiento.motivo} <br />
                <button onClick={() => handleAgendamientoClick(agendamiento)}>Ver Detalles</button>
                <button onClick={() => handleEditClick(agendamiento)}>Editar</button>
              </div>
            </li>
          ))}
        </ul>

        {selectedAgendamiento && (
          <div className="agendamiento-details">
            <h2>Detalles del Agendamiento</h2>
            <p><strong>Fecha:</strong> {selectedAgendamiento.fecha}</p>
            <p><strong>Hora:</strong> {selectedAgendamiento.hora}</p>
            <p><strong>Estado:</strong> {selectedAgendamiento.estado}</p>
            <p><strong>Motivo:</strong> {selectedAgendamiento.motivo}</p>
            <p><strong>Detalles:</strong> {selectedAgendamiento.detalles}</p>
            <button onClick={closeDetails}>Cerrar</button>
          </div>
        )}

        {editingAgendamiento && (
          <div className="agendamiento-edit">
            <h2>Editar Agendamiento</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Fecha:
 <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
              </label>
              <br />
              <label>
                Hora:
                <input type="time" name="hora" value={formData.hora} onChange={handleChange} />
              </label>
              <br />
              <label>
                Motivo:
                <input type="text" name="motivo" value={formData.motivo} onChange={handleChange} />
              </label>
              <br />
              <label>
                Detalles:
                <textarea name="detalles" value={formData.detalles} onChange={handleChange} />
              </label>
              <br />
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        )}
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
    </div>
  );
};

export default HistorialAgendamientos;