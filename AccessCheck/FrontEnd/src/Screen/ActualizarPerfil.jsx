import React, { useState, useEffect} from 'react';
import HeaderPR from '../Components/HeaderPR'; // Asegúrate de que la ruta sea correcta
import Footer from '../Components/Footer';
import '../Styles/App3.css';
import Actualizar from '../Assets/Img/Actualizar.gif';
import '@fortawesome/fontawesome-free/css/all.css';

const ActualizarPerfil = () => {
  const [datosFormulario, setDatosFormulario] = useState({
    tipoDocumento: '',
    nombres: '',
    apellidos: '',
    numdoc: '', // Cambiado a numdoc
    telefono: '',
    torre: '',
    apartamento: '',
    vehiculo: '',
    tipoVehiculo: '', // Nuevo campo para tipo de vehículo
    placa: '',
    modelo: '',
    marca: '',
    color: '',
    email: '',
    contrasenia: ''
  });
  
  const [showScrollUpBtn, setShowScrollUpBtn] = useState(false);
  const [showScrollDownBtn, setShowScrollDownBtn] = useState(false);
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
  
  const manejarCambioEntrada = (event) => {
    const { name, value } = event.target;

     // Actualiza el estado del campo de entrada sin restricciones
  setDatosFormulario({
    ...datosFormulario,
    [name]: value,
  });
  
    // Validación de la placa según el tipo de vehículo
    if (name === 'placa') {
      let esValido = false;
  
      if (datosFormulario.tipoVehiculo === 'automovil') {
        // Validación para automóviles: 3 letras + 3 números
        esValido = /^[A-Za-z]{3}\d{3}$/.test(value);
      } else if (datosFormulario.tipoVehiculo === 'motocicleta') {
        // Validación para motocicletas: 3 letras + 2 números + 1 letra
        esValido = /^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(value);
      }
  
      if (esValido || value === '') {
        // Solo actualiza el estado si es válido o si el campo está vacío
        setDatosFormulario({
          ...datosFormulario,
          [name]: value,
        });
      } else {
        // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje
        console.log('Placa no válida');
      }
    } else {
      // Manejo de otros campos
      setDatosFormulario({
        ...datosFormulario,
        [name]: value,
      });
    }
  };
  const manejarCambioVehiculo = (e) => {
    const { value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      vehiculo: value,
      tipoVehiculo: '', // Reiniciar tipoVehiculo al cambiar vehiculo
      placa: '',
      modelo: '',
      marca: '',
      color: '',
    }));
  };
  const manejarCambioTipoVehiculo = (e) => {
    const { value } = e.target;
    setDatosFormulario((prevDatos) => ({
      ...prevDatos,
      tipoVehiculo: value,
      placa: '',
      modelo: '',
      marca: '',
      color: '',
    }));
  };



  

  return (
    <div className="App">
      <HeaderPR /><br></br>
      <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>
      <div className="container">
        <div className="left-section">
          <img src={Actualizar} alt="Icono Grande" className="icono-grande" style={{ marginTop: '10px' }} /><br /><br></br>
          <h1>Actualizat</h1>
          <br />
          <h1>Si deseas actualizar tu perfil</h1>
          <h2>Por favor, edita los siguientes campos con la información actualizada de tus datos personales</h2>
        </div>

         <div className="outer-container" style={{ padding: '60px', marginTop: '430px', marginLeft: '20px', minHeight: '400px' }}>
         <div className="form-container">
                                   
                                  <h2 className="center-title">Actualizar Datos</h2><br></br>
                                    
                                      <div className="formulario-grid">
                                        <div>
                                          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                                          <select 
                                        id="tipo-documento"
                                        name="tipoDocumento"
                                        value={datosFormulario.tipoDocumento}
                                        onChange={manejarCambioEntrada}
                                        required
                                      >
                                            <option value="">Seleccione...</option>
                                            <option value="cc">C.C</option>
                                            <option value="ce">C.E</option>
                                          </select>
                                        </div>
                                  <div>
                                    <label htmlFor="numdoc">
                                      <i className="fas fa-id-card" /> Número de documento:
                                    </label>
                                    <input
                                      type="text"
                                      id="numdoc"
                                      name="numdoc"
                                      value={datosFormulario.numdoc}
                                      onChange={manejarCambioEntrada}
                                      onKeyPress={(e) => {
                                        if (!/^\d+$/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                      maxLength={10}
                                      placeholder="Ingresa tu número de documento"
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
                                        value={datosFormulario.nombres}
                                        onChange={manejarCambioEntrada}
                                        onKeyPress={(e) => {
                                          // Verifica si el carácter ingresado es una letra o un espacio
                                          if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                            e.preventDefault(); // Evita la entrada si no es una letra
                                          }
                                        }}
                                        required
                                        placeholder="Ingresa tus nombres completos"
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
                                        value={datosFormulario.apellidos}
                                        onChange={manejarCambioEntrada}
                                        onKeyPress={(e) => {
                                          // Verifica si el carácter ingresado es una letra o un espacio
                                          if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                            e.preventDefault(); // Evita la entrada si no es una letra
                                          }
                                        }}
                                        required
                                        placeholder="Ingresa tus apellidos completos"
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
                                          value={datosFormulario.telefono}
                                          onChange={(e) => {
                                            // Verifica si el nuevo valor tiene 10 o menos caracteres y solo contiene números
                                            const newValue = e.target.value;
                                            if (/^\d{0,10}$/.test(newValue)) {
                                              manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                                            }
                                          }}
                                          onKeyPress={(e) => {
                                            // Verifica si el carácter ingresado es un número
                                            if (!/^\d+$/.test(e.key)) {
                                              e.preventDefault(); // Evita la entrada si no es un número
                                            }
                                          }}
                                          required
                                          placeholder="Ingresa tu número de teléfono"
                                        />
                                    </div>
                                  <div>
                                  <label htmlFor="torre">
                                                <i className="fas fa-building" /> Torre del apartamento:
                                              </label>
                                              <select
                                                id="torre"
                                                name="torre"
                                                value={datosFormulario.torre}
                                                onChange={manejarCambioEntrada}
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
                                                id=" apartamento"
                                                name="apartamento"
                                                value={datosFormulario.apartamento}
                                                onChange={manejarCambioEntrada}
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
                                                {/* Añade más opciones aquí */}
                                              </select>
                                              </div>

                                              <div>
                                            <label htmlFor="vehiculo"><i className="fas fa-car" /> ¿Posee Vehículo?</label>
                                            <select
                                              id="vehiculo"
                                              name="vehiculo"
                                              value={datosFormulario.vehiculo}
                                              onChange={manejarCambioVehiculo}
                                              required
                                            >
                                              <option value="">Seleccione</option>
                                              <option value="No">No</option>
                                              <option value="Si">Sí</option>
                                            </select>
                                          </div>
                                          
                                          {datosFormulario.vehiculo === 'Si' && (
                                            <div>
                                            <label htmlFor="tipoVehiculo">Tipo de vehículo:</label>
                                            <select
                                              id="tipoVehiculo"
                                              name="tipoVehiculo"
                                              value={datosFormulario.tipoVehiculo}
                                              onChange={manejarCambioTipoVehiculo}
                                              required
                                            >
                                              <option value="">Seleccione</option>
                                              <option value="automovil">Automóvil</option>
                                              <option value="motocicleta">Motocicleta</option>
                                              <option value="bicicleta">Bicicleta</option>
                                            </select>
                                          </div>
                                        )}
                                        {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                                        <div>
                                          <label htmlFor="placa">
                                            <i className="fas fa-car" /> {/* Ícono de automóvil */}
                                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Placa:
                                          </label>
                                          <input
                                            type="text"
                                            id="placa"
                                            name="placa"
                                            value={datosFormulario.placa}
                                            onChange={manejarCambioEntrada}
                                            placeholder="Ej: ABC123 o ABC12D"
                                            required
                                          />
                                          {/* Mensaje de error */}
                                          {datosFormulario.placa && !/^[A-Za-z]{3}\d{3}$/.test(datosFormulario.placa) && datosFormulario.tipoVehiculo === 'automovil' && (
                                            <small style={{ color: 'red' }}>Formato inválido para automóvil (Ej: ABC123)</small>
                                          )}
                                          {datosFormulario.placa && !/^[A-Za-z]{3}\d{2}[A-Za-z]$/.test(datosFormulario.placa) && datosFormulario.tipoVehiculo === 'motocicleta' && (
                                            <small style={{ color: 'red' }}>Formato inválido para motocicleta (Ej: ABC12D)</small>
                                          )}
                                        </div>
                                      ) : null}

                            {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                                        <div>
                                          <label htmlFor="modelo">
                                            <i className="fas fa-car" />
                                            <i className="fas fa-motorcycle" style={{ marginLeft: '5px' }} /> Modelo:
                                          </label>
                                          <input
                                            type="text"
                                            id="modelo"
                                            name="modelo"
                                            value={datosFormulario.modelo}
                                            onChange={(e) => {
                                              // Verifica si el nuevo valor solo contiene letras y espacios
                                              const newValue = e.target.value;
                                              if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                                manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                                              }
                                            }}
                                            onKeyPress={(e) => {
                                              // Verifica si el carácter ingresado es una letra o un espacio
                                              if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                                e.preventDefault(); // Evita la entrada si no es una letra o un espacio
                                              }
                                            }}
                                             placeholder="Ej: Toyota, Nissan"
                                            required
                                          />
                                          {datosFormulario.tipoVehiculo === 'automovil' ? (
                                            <small>Ingresa el modelo del automóvil (Ej: Toyota Corolla)</small>
                                          ) : (
                                            <small>Ingresa el modelo de la motocicleta (Ej: Honda CB500F)</small>
                                          )}
                                        </div>
                                      ) : null}
                                      
                                              {datosFormulario.tipoVehiculo === 'automovil' || datosFormulario.tipoVehiculo === 'motocicleta' ? (
                                                <div>
                                                  <label htmlFor="color"><i className="fas fa-palette" /> Color:</label>
                                                  <select
                                                    id="color"
                                                    name="color"
                                                    value={datosFormulario.color}
                                                    onChange={manejarCambioEntrada}
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

                                              {datosFormulario.tipoVehiculo === 'bicicleta' ? (
                                                <div>
                                                  <label htmlFor="marca">
                                                    <i className="fa fa-bicycle" /> Marca:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    id="marca"
                                                    name="marca"
                                                    value={datosFormulario.marca}
                                                    onChange={(e) => {
                                                      // Verifica si el nuevo valor solo contiene letras y espacios
                                                      const newValue = e.target.value;
                                                      if (/^[a-zA-Z\s]*$/.test(newValue)) {
                                                        manejarCambioEntrada(e); // Llama a la función de manejo si es válido
                                                      }
                                                    }}
                                                    onKeyPress={(e) => {
                                                      // Verifica si el carácter ingresado es una letra o un espacio
                                                      if (!/^[a-zA-Z\s]+$/.test(e.key)) {
                                                        e.preventDefault(); // Evita la entrada si no es una letra o un espacio
                                                      }
                                                    }}
                                                    placeholder="Ej: Trek, Specialized" // Texto de ayuda
                                                    required
                                                  />
                                                </div>
                                              ) : null}

                                            {datosFormulario.tipoVehiculo === 'bicicleta' ? (
                                                <div>
                                                <label htmlFor="color"><i className="fas fa-palette" /> Color:</label>
                                                <select
                                                  id="color"
                                                  name="color"
                                                  value={datosFormulario.color}
                                                  onChange={manejarCambioEntrada}
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


                                              <div>
                                                <label htmlFor="email">
                                                  <i className="fas fa-envelope"></i> Correo electrónico:
                                                </label>
                                                <input
                                                  type="email"
                                                  id="email"
                                                  name="email"
                                                  value={datosFormulario.email}
                                                  onChange={manejarCambioEntrada}
                                                  placeholder="ejemplo@correo.com"
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
                                                  value={datosFormulario.contrasenia}
                                                  onChange={manejarCambioEntrada}
                                                  placeholder="Ingresa una contraseña segura"
                                                  maxLength={8} // Limita la entrada a 8 caracteres
                                                  required
                                                />
                                                <small>(máximo 8 caracteres)</small>
                                              </div>
                                        </div>
                                        <div className="center-buttons">
                                        <button className="ver-mas-button" id="updateBtn" type="submit">
                                            <i className="fas fa-sync-alt"></i> Actualizar 
                                          </button>
                                        </div>
                                    
                                </div>
                            </div>
                      </div>
                    
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
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

export default ActualizarPerfil;
