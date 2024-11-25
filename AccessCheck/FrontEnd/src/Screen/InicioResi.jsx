import React, { useState } from 'react';
import Axios from 'axios';
import Footer from '../Components/Footer';
import '../Styles/App3.css';
import HeaderPR from '../Components/HeaderPR';
import VisitantesGif from '../Assets/Img/visitantes.gif';

const InicioResi = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [numPersonas, setNumPersonas] = useState(""); 
  const [tipoDocumento, setTipoDocumento] = useState("");  
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [telefono, setTelefono] = useState("");
  const [torre, setTorre] = useState("");
  const [apartamento, setApartamento] = useState("");
  const [vehiculo, setVehiculo] = useState("");
  const [tipoVehiculo, setTipoVehiculo] = useState("");
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [color, setColor] = useState("");
  const [marca, setMarca] = useState("");
  const [mensaje, setMensaje] = useState("");

  const add = () => {
    const userData = {
      fechaInicio,
      fechaFin,
      horaInicio,
      horaFin,
      numPersonas,
      nombres,
      apellidos,
      tipoDocumento,
      numDoc,
      telefono,
      torre,
      apartamento,
      vehiculo,
      tipoVehiculo: vehiculo === 'Si' ? tipoVehiculo : null,
      placa: vehiculo === 'Si' ? placa : null,
      modelo: vehiculo === 'Si' ? modelo : null,
      color: vehiculo === 'Si' ? color : null,
      marca: vehiculo === 'Si' ? marca : null
    };
    
    console.log("Datos a enviar:", userData);

    // Validación de la placa según el tipo de vehículo
    let esValido = true;

    if (vehiculo === 'Si') {
      if (tipoVehiculo === 'automovil') {
        esValido = /^[A-Za-z]{3}\d{3}$/.test(placa);
      } else if (tipoVehiculo === 'motocicleta') {
        esValido = /^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(placa);
      }

      if (!esValido) {
        console.log('Placa no válida');
        setMensaje('Placa no válida');
        return; // Detener la ejecución si la placa no es válida
      }
    }

    // Cambia el endpoint si es necesario
    Axios.post("http://localhost:3001/agendamiento", userData)
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        setMensaje("Agendamiento Realizado");
        handleLimpiarCampos(); // Limpiar campos después de registrar
      })
      
      .catch(err => {
        console.error("Error al agendar visita:", err.response ? err.response.data : err);
        setMensaje("Error al agendar visita");
      });
  };

  const handleLimpiarCampos = () => {
    setFechaInicio('');
    setFechaFin('');
    setHoraInicio('');
    setHoraFin('');
    setNumPersonas('');
    setNombres('');
    setApellidos('');
    setTipoDocumento('');
    setNumDoc('');
    setTelefono('');
    setTorre('');
    setApartamento('');
    setVehiculo('');
    setTipoVehiculo ('');
    setPlaca('');
    setModelo('');
    setColor('');
    setMarca('');
    setMensaje(''); // Limpiar mensaje también
  };

  return (
    <div>
      <HeaderPR />
      <div className="App">
        <h1 className="apartment-list-title typing-text">Formulario Agendamiento de Visita</h1>
        <div className="container">
          <div className="left-section">
            <img 
              src={VisitantesGif} 
              alt="Icono Grande" 
              className="icono-grande" 
              style={{ marginTop: '150px' }} 
            /><br /><br />
            <h1>Agenda una Visita</h1>
            <br />
            <h2>Llena este formulario para solicitar el ingreso de familia o amigos a tu apartamento</h2>
          </div>

          <div className="outer-container" style={{ padding: '60px', marginTop: '500px', marginLeft: '20px', minHeight: '600px' }}>
            <div className="form-container">
              <h2 className="center-title">Generar Agendamiento</h2><br />
              <form onSubmit={(e) => { e.preventDefault(); add(); }}>
                <div className="formulario-grid">
                  <div>
                    <label htmlFor="fechaInicio">
                      <i className="fas fa-calendar-alt" /> Fecha de inicio:
                    </label>
                    <input
                      type="date"
                      id="fecha-inicio"
                      name='fecha-inicio'         
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
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
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hora-inicio">
                      <i className="fas fa-clock" /> Hora de inicio:
                    </label>
                    <input
                      type="time"
                      id="hora-inicio"
                      value={horaInicio}
                      onChange={(e) => setHoraInicio(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="hora-fin"><i className="fas fa-clock" /> Hora de salida:
                    </label>
                    <input
                      type="time"
                      id="hora-fin"
                      value={horaFin}
                      onChange={(e) => setHoraFin(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="num-personas">
                      <i className="fas fa-users" /> Número de personas:
                    </label>
                    <select
                      id="num-personas"
                      value={numPersonas}
                      onChange={(e) => setNumPersonas(e.target.value)}
                      required
                    >
                      <option value="">Seleccione</option>
                      {[...Array(5)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="nombres"><i className="fas fa-user" /> Nombres del visitante:
                    </label>
                    <input
                      type="text"
                      id="nombres"
                      name="nombres"
                      value={nombres}
                      onChange={(e) => setNombres(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      required
                      placeholder="Ingresa los nombres completos del visitante"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellidos"><i className="fas fa-user" /> Apellidos del visitante:
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={apellidos}
                      onChange={(e) => setApellidos(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      required
                      placeholder="Ingresa los apellidos completos del visitante"
                    />
                  </div>
                  <div>
                    <label htmlFor="tipo-documento"> Tipo de documento:</label>
                    <select
                      id="tipo-documento"
                      name="tipo-documento"
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value)}
                      required
                    >
                      <option value="">Seleccione...</option>
                      <option value="cc">C.C</option>
                      <option value="ce">C.E</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="num-doc"><i className="fas fa-id-card" /> Número de documento:</label>
                    <input
                      type="text"
                      id="num-doc"
                      name="num-doc"
                      value={numDoc}
                      onChange={(e) => setNumDoc(e.target.value)}
                      onKeyPress={(e) => {
                        if (!/^\d+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      maxLength={10}
                      placeholder="Ingresa el número de documento del visitante"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono">
                      <i className="fas fa-phone" /> Teléfono:
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={telefono}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        if (/^\d{0,10}$/.test(newValue)) {
                          setTelefono(newValue);
                        }
                      }}
                      onKeyPress={(e) => {
                        if (!/^\d+$/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      required
                      placeholder="Ingresa el número de teléfono del visitante"
                    />
                  </div>

                  <div>
                    <label htmlFor="torre">
                      <i className="fas fa-building" /> Torre del apartamento:
                    </label>
                    <select
                      id="torre"
                      name="torre"
                      value={torre}
                      onChange={(e) => setTorre(e.target.value)}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="A">Torre A</option>
                      <option value="B">Torre B</option>
                      <option value="C">Torre C</option>
                      <option value="D">Torre D</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="apartamento">
                      <i className="fas fa-door-closed" /> Número de apartamento:
                    </label>
                    <select
                      id="apartamento"
                      value={apartamento}
                      onChange={(e) => setApartamento(e.target.value)}
                      required
                    >
                      <option value="">Seleccione</option>
                      {[101, 102, 103, 104, 201, 202, 203, 204, 301, 302, 303, 304, 401, 402, 403, 404, 501, 502, 503, 504, 601, 602, 603, 604].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="vehiculo">
                      <i className="fas fa-car" /> ¿Posee Vehículo?
                    </label>
                    <select
                      id="vehiculo"
                      value={vehiculo}
                      onChange={(e) => setVehiculo(e.target.value)}
                    >
                      <option value="">Selecciona</option>
                      <option value="Si">Sí</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {vehiculo === 'Si' && (
                    <>
                      <div>
                        <label htmlFor="tipo-vehiculo">Tipo de vehículo:</label>
                        <select
                          id="tipo-vehiculo"
                          value={tipoVehiculo}
                          onChange={(e) => setTipoVehiculo(e.target.value)}
                          required
                        >
                          <option value="">Selecciona</option>
                          <option value="automovil">Automóvil</option>
                          <option value="motocicleta">Motocicleta</option>
                          <option value="bicicleta">Bicicleta</option>
                        </select>
                      </div>

                      {tipoVehiculo === 'automovil' || tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="placa">
                            <i className="fas fa-car" />
                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Placa:
                          </label>
                          <input
                            type="text"
                            id="placa"
                            value={placa}
                            onChange={(e) => setPlaca(e.target.value)}
                            placeholder="Ej: ABC123 o ABC12D"
                            required
                          />
                          {placa && !/^[A-Za-z]{3}\d{3}$/.test(placa) && tipoVehiculo === 'automovil' && (
                            <small style={{ color: 'red' }}>Formato inválido para automóvil (Ej: ABC123)</small>
                          )}
                          {placa && !/^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(placa) && tipoVehiculo === 'motocicleta' && (
                            <small style={{ color: 'red' }}>Formato inválido para motocicleta (Ej: ABC12D)</small>
                          )}
                        </div>
                      ) : null}

                      {tipoVehiculo === 'automovil' || tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="modelo">
                            <i className="fas fa-car" />
                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Modelo:
                          </label>
                          <input
                            type="text"
                            id="modelo"
                            value={modelo}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                setModelo(newValue);
                              }
                            }}
                            placeholder="Ej: Toyota Corolla"
                            required
                          />
                          {tipoVehiculo === 'automovil' ? (
                            <small>Ingresa el modelo del automóvil (Ej: Toyota Corolla)</small>
                          ) : (
                            <small>Ingresa el modelo de la motocicleta (Ej: Honda CB500F)</small>
                          )}
                        </div>
                      ) : null}

                      {tipoVehiculo === 'automovil' || tipoVehiculo === 'motocicleta' ? (
                        <div>
                          <label htmlFor="color">
                            <i className="fas fa-palette" /> Color:
                          </label>
                          <select
                            id="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Negro">Negro</option>
                            <option value="Blanco">Blanco</option>
                            <option value="Gris">Gris</option>
                          </select>
                        </div>
                      ) : null}

                      {tipoVehiculo === 'bicicleta' ? (
                        <div>
                          <label htmlFor="marca">
                            <i className="fa fa-bicycle" /> Marca:
                          </label>
                          <input
                            type="text"
                            id="marca"
                            value={marca}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                setMarca(newValue);
                              }
                            }}
                            placeholder="Ej: Trek, Specialized"
                            required
                          />
                        </div>
                      ) : null}

                      {tipoVehiculo === 'bicicleta' ? (
                        <div>
                          <label htmlFor="color">
                            <i className="fas fa-palette" /> Color:
                          </label>
                          <select
                            id="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            required
                          >
                            <option value="">Seleccione</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Azul">Azul</option>
                            <option value="Negro">Negro</option>
                            <option value="Blanco">Blanco</option>
                            <option value="Gris">Gris</option>
                          </select>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>

                <div className="center-buttons" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <button className="ver-mas-button" type="submit">
                    <i className="fas fa-calendar-check" /> Generar Agendamiento
                  </button>
                  <button
                    className="ver-mas-button"
                    id="limpiar-campos"
                    onClick={handleLimpiarCampos}
                    type="button"
                  >
                    <i className="fas fa-eraser" /> Limpiar Campos
                  </button>
                </div>
              </form>
              {mensaje && <p>{mensaje}</p>}
            </div>
          </div>
        </div>
      </div>
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default InicioResi;