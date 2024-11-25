import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import HeaderIn from '../Components/HeaderIn';
import '../Styles/App3.css';
import Inicio1 from '../Assets/Img/inicio1.jpg';
import Axios from "axios";
import '@fortawesome/fontawesome-free/css/all.css';

function Registro() {
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
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios

  // Definición de getUsuarioy
  const getUsuario = () => {
    Axios.get("http://localhost:3001/usuarios") // Cambia esta URL según tu API
      .then((response) => {
        setUsuarios(response.data); // Almacena los usuarios en el estado
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };

  // useEffect para llamar a getUsuario al cargar el componente
  useEffect(() => {
    getUsuario();
  }, []);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      tipoDocumento,
      nombres,
      apellidos,
      numDoc,
      telefono,
      torre,
      apartamento,
      correo,
      contrasenia,
      vehiculo,
      tipoVehiculo: vehiculo === 'Si' ? tipoVehiculo : null,
      placa: vehiculo === 'Si' ? placa : null,
      modelo: vehiculo === 'Si' ? modelo : null,
      color: vehiculo === 'Si' ? color : null,
      marca: vehiculo === 'Si' ? marca : null
    }).then(() => {
      getUsuario(); // Actualiza la lista de usuarios después de registrar
      setMensaje("Usuario registrado");
    }).catch(err => {
      console.error(err);
      setMensaje("Error al registrar el usuario");
    });
  };

  return (
    <div className="App">
      <HeaderIn /><br />
      <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>
      <div className="container">
        <div className="left-section">
          <img src={Inicio1} alt="Icono Grande" className="icono-grande" />
          <h1>Registro</h1>
          <br />
          <h1>Si no tienes una cuenta regístrate aquí</h1>
          <h2>Por favor, diligencia el siguiente formulario</h2>
        </div>
        
        <div className="outer-container" style={{ padding: '60px', marginTop: '430px', marginLeft: '20px', minHeight: '400px' }}>
          <div className="form-container">
            <h2 className="center-title">Registro de Residente</h2><br />
            <form onSubmit={(e) => { e.preventDefault(); add(); }}>
              <div className="formulario-grid">
                <div>
                  <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                  <select
                    id="tipo-documento"
                    name="tipoDocumento"
                    value={tipoDocumento}
                    onChange={(event) => setTipoDocumento(event.target.value)}
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="CC">C.C</option>
                    <option value="CE">C.E</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="numdoc">
                    <i className="fas fa-id-card" /> Número de documento:
                  </label>
                  <input
                    type="text"
                    id="numdoc"
                    name="numDoc"
                    value={numDoc}
                    onChange={(event) => setNumDoc(event.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="nombres">
                    <i className="fas fa-user" /> Nombres:
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={nombres}
                    onChange={(event) => setNombres(event.target.value)}
                    required
                  />
                </div>
                                    
                <div>
                  <label htmlFor="apellidos">
                    <i className="fas fa-user" /> Apellidos:
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={apellidos}
                    onChange={(event) => setApellidos(event.target.value)}
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
                    onChange={(event) => setTelefono(event.target.value)}
                    required
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
                    onChange={(event) => setTorre(event.target.value)}
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
                    name="apartamento"
                    value={apartamento}
                    onChange={(event) => setApartamento(event.target.value)}
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="101">101</option>
                    <option value="102">102</option>
                    <option value="103">103</option>
                    <option value="104">104</option>
                    <option value="201">201</option>
                    <option value="202">202</option>
                    <option value="203">203</option>
                    <option value="204">204</option>
                    <option value="301">301</option>
                    <option value="302">302</option>
                    <option value="303">303</option>
                    <option value="304">304</option>
                    <option value="401">401</option>
                    <option value="402">402</option>
                    <option value="403">403</option>
                    <option value="404">404</option>
                    <option value="501">501</option>
                    <option value="502">502</option>
                    <option value="503">503</option>
                    <option value="504">504</option>
                    <option value="601">601</option>
                    <option value="602">602</option>
                    <option value="603">603</option>
                    <option value="604">604</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="vehiculo">
                    <i className="fas fa-car" /> ¿Posee Vehículo?
                  </label>
                  <select
                    id="vehiculo"
                    name="vehiculo"
                    value={vehiculo}
                    onChange={(event) => setVehiculo(event.target.value)}
                    required
                  >
                    <option value="">Seleccione</option>
                    <option value="No">No</option>
                    <option value="Si">Sí</option>
                  </select>
                </div>
                
                {vehiculo === 'Si' && (
                  <div>
                    <label htmlFor="tipoVehiculo">Tipo de vehículo:</label>
                    <select
                      id="tipoVehiculo"
                      name="tipoVehiculo"
                      value={tipoVehiculo}
                      onChange={(e) => setTipoVehiculo(e.target.value)}
                      required
                    >
                      <option value="">Seleccione</option>
                      <option value="Automovil ">Automóvil</option>
                      <option value="Motocicleta">Motocicleta</option>
                      <option value="Bicicleta">Bicicleta</option>
                    </select>
                  </div>
                )}
                
                {vehiculo === 'Si' && (tipoVehiculo === 'Automovil' || tipoVehiculo === 'Motocicleta') && (
                  <>
                    <div id="vehiculo-form" style={{ display: vehiculo === 'Si' ? 'block' : 'none' }}>
                      <label htmlFor="placa">
                        <i className="fas fa-car" /> {/* Ícono de automóvil */}
                        <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Placa:
                      </label>
                      <input
                        type="text"
                        id="placa"
                        name="placa"
                        value={placa}
                        onChange={(event) => setPlaca(event.target.value)}
                        required={vehiculo === 'Si'}
                      />
                    </div>

                    <div id="vehiculo-form" style={{ display: vehiculo === 'Si' ? 'block' : 'none' }}>
                      <label htmlFor="modelo">
                        <i className="fas fa-car" />
                        <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Modelo:
                      </label>
                      <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        value={modelo}
                        onChange={(event) => setModelo(event.target.value)}
                        required={vehiculo === 'Si'}
                      />
                    </div>

                    <div>
                      <label htmlFor="color">Color:</label>
                      <select 
                        id="color"
                        name="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)}
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
                  </>
                )}

                {vehiculo === 'Si' && tipoVehiculo === 'Bicicleta' && (
                  <>
                    <div>
                      <label htmlFor="color">Color:</label>
                      <select id="color" name="color" value={color} onChange={(event) => setColor(event.target.value)} required>
                        <option value="">Seleccione</option>
                        <option value="Rojo">Rojo</option>
                        <option value="Azul">Azul</option>
                        <option value="Negro">Negro</option>
                        <option value="Blanco">Blanco</option>
                        <option value="Gris">Gris</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="marca">Marca:</label>
                      <input type="text" id="marca" name="marca" value={marca} onChange={(event) => setMarca(event.target.value)} required />
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Correo electrónico:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="correo"
                    value={correo}
                    onChange={(event) => setCorreo(event.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="contrasenia">
                    <i className="fas fa-lock" /> Contraseña:
                  </label>
                  <input
                    type="password"
                    id="contrasenia"
                    name="contrasenia"
                    value={contrasenia}
                    onChange={(event) => setContrasenia(event.target.value)}
                    placeholder="Ingresa una contraseña segura"
                    maxLength={8} // Limita la entrada a 8 caracteres
                    required
                  />
                  <small>(máximo 8 caracteres)</small>
                </div>
              </div>
              
              <div className="center-buttons">
                <button className="ver-mas-button" id="updateBtn" type="submit">
                  <i className="fas fa-user-plus"></i> Registrar
                </button>
              </div>
            </form>
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </div>
        </div>
      </div>
      
      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Footer />
    </div>
  );
};

export default Registro;