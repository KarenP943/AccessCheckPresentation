import React, { useState } from 'react';
import HeaderAdminSol from '../Components/HeaderAdminSol';
import Footer from '../Components/Footer';
import '../Styles/App3.css';
import Visitantes from '../Assets/Img/visitantes.gif';
import '@fortawesome/fontawesome-free/css/all.css';


const SolicitudAgendamiento = () => {
  const [, setNombresResidente] = useState('');
  const [, setApellidosResidente] = useState('');
  const [, setTelefono] = useState('');
  const [, setNombresVisitante] = useState('');
  const [, setApellidosVisitante] = useState('');
  const [, setFechaVisita] = useState('');
  const [, setFechaFin] = useState('');
  const [, setHoraInicio] = useState('');
  const [, setHoraSalida] = useState('');
  const [, ] = useState('');
  const [, setTorre] = useState('');
  const [, setApartamento] = useState('');
  const [, setVehiculo] = useState('');
  const [, setTipoVehiculo] = useState('');
  const [, setPlaca] = useState('');
  const [, setModelo] = useState('');
  const [, setColor] = useState('');

  return (
    <div>
      <HeaderAdminSol />
      <div className="App">
        <div className="container">
          <div className="left-section">
            <img src={Visitantes} alt="Icono Grande" className="icono-grande" /><br></br><br></br>
            <h1>Solicitud Residente</h1><br></br>
            <h2>Al recibir la solicitud por parte del residente podrá aceptar o rechazar la solicitud</h2>
          </div>
          <div className="outer-container" style={{ padding: '60px', marginTop: '530px', marginLeft: '20px', minHeight: '400px' }}>
          <div className="form-container">
          
              
                  <h2 className="center-title">Solicitud Residente</h2><br></br>
              
                  <div className="formulario-grid">
                    <div>
                    <label htmlFor="nombres-residente">
                      <i className="fas fa-user" /> Nombres del residente:
                    </label>
                    <input
                      type="text"
                      id="nombres-residente"
                      name="nombres-residente"
                      value="Pepe"
                      disabled
                      onChange={(e) => setNombresResidente(e.target.value)}
                      required
                    />
                    </div>

                     <div>
                    <label htmlFor="apellidos-residente">
                      <i className="fas fa-user" /> Apellidos del residente:
                    </label>
                    <input
                      type="text"
                      id="apellidos-residente"
                      name="apellidos-residente"
                      value="Cepeda"
                      disabled
                      onChange={(e) => setApellidosResidente(e.target.value)}
                      required
                    />
                    </div>

                    <div>
                    <label htmlFor="telefono">
                      <i className="fas fa-id-card" /> Teléfono:
                    </label>
                    <input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value="0987654321"
                      disabled
                      onChange={(e) => setTelefono(e.target.value)}
                      required
                    />
                    </div>

                   <div>
                    <label htmlFor="nombres-visitante">
                      <i className="fas fa-user" /> Nombres del visitante:
                    </label>
                    <input
                      type="text"
                      id="nombres-visitante"
                      name="nombres-visitante"
                      value="Camila"
                      disabled
                      onChange={(e) => setNombresVisitante(e.target.value)}
                      required
                    />
</div>
<div>
                    <label htmlFor="apellidos-visitante">
                      <i className="fas fa-user" /> Apellidos del visitante:
                    </label>
                    <input
                      type="text"
                      id="apellidos-visitante"
                      name="apellidos-visitante"
                      value="Rodríguez"
                      disabled
                      onChange={(e) => setApellidosVisitante(e.target.value)}
                      required
                    />
                    </div>
                    
<div>
                    <label htmlFor="fecha-visita">
                      <i className="fas fa-calendar-alt" /> Fecha de visita:
                    </label>
                    <input
                      type="date"
                      id="fecha-visita"
                      name="fecha-visita"
                      value="2024-08-20"
                      disabled
                      onChange={(e) => setFechaVisita(e.target.value)}
                      required
                    />
                    </div>
                    <div>
                    <label htmlFor="fecha-fin">
                      <i className="fas fa-calendar-alt" /> Fecha de fin:
                    </label>
                    <input
                      type="date"
                      id="fecha-fin"
                      name="fecha-fin"
                      value="2024-08-21"
                      disabled
                      onChange={(e) => setFechaFin(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hora-inicio">
                      <i className="fas fa-clock" /> Hora de inicio:
                    </label>
                    <input
                      type="text"
                      id="hora-inicio"
                      name="horaInicio"
                      value="12:30 pm"
                      disabled
                      onChange={(e) => setHoraInicio(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hora-salida">
                      <i className="fas fa-clock" /> Hora de salida:
                    </label>
                    <input
                      type="text"
                      id="hora-salida"
                      name="horaSalida"
                      value="5:00 pm"
                      onChange={(e) => setHoraSalida(e.target.value)}
                      required
                    />
                  </div>


<div>
                    <label htmlFor="torre">
                      <i className="fas fa-building" /> Torre:
                    </label>
                    <input
                      type="text"
                      id="torre"
                      name="torre"
                      value="A"
                      disabled
                      onChange={(e) => setTorre(e.target.value)}
                      required
                    />
                    </div>


                    <div>
                    <label htmlFor="apartamento">
                      <i className="fas fa-building" /> Apartamento:
                    </label>
                    <input
                      type="number"
                      id="apartamento"
                      name="apartamento"
                      value="101"
                      disabled
                      onChange={(e) => setApartamento(e.target.value)}
                      required
                    />
                    </div>

<div>
                    <label htmlFor="vehiculo">
                      <i className="fas fa-car" /> Vehículo:
                    </label>
                    <input
                      id="vehiculo"
                      name="vehiculo"
                      value="Si"
                      disabled
                      onChange={(e) => setVehiculo(e.target.value)}
                      required
                    />
                    </div>
                    
                      <div>
                        <label htmlFor="tipoVehiculo">
                          Tipo de vehículo:
                        </label>
                        <input
                          id="tipoVehiculo"
                          name="tipoVehiculo"
                          value="Automóvil"
                          onChange={(e) => setTipoVehiculo(e.target.value)}
                          required
                        />
                      
                      </div>

<div>
                    <label htmlFor="placa">
                      <i className="fas fa-car" /> Placa:
                    </label>
                    <input
                      type="text"
                      id="placa"
                      name="placa"
                      value="MX122"
                      disabled
                      onChange={(e) => setPlaca(e.target.value)}
                      required
                    />
</div>
<div>
                    <label htmlFor="modelo">
                      <i className="fas fa-car" /> Modelo:
                    </label>
                    <input
                      type="text"
                      id="modelo"
                      name="modelo"
                      value="Renault"
                      disabled
                      onChange={(e) => setModelo(e.target.value)}
                      required
                    />
</div>
<div>
                    <label htmlFor="color">
                      <i className="fas fa-car" /> Color:
                    </label>
                    <input
                      type="text"
                      id="color"
                      name="color"
                      value="Negro"
                      disabled
                      onChange={(e) => setColor(e.target.value)}
                      required
                    />
</div>

<div>
                    <div className="center-buttons">
                      <button className="ver-mas-button" id="aceptarBtn" type="submit">
                        <i className="fas fa-check" /> Aceptar
                      </button>
                      
                      <button className="ver-mas-button" id="rechazarBtn" type="submit">
                        <i className="fas fa-times" /> Rechazar
                      </button>
                      </div>
                    </div>
                 
                </div>
              </div>
            </div>
          </div>

      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default SolicitudAgendamiento;
