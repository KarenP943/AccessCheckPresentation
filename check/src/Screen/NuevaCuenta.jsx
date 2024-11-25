import React, { useState, useEffect } from 'react';
import '../Styles/App3.css';
import Perfil from '../Assets/Img/perfil.gif';
import HeaderAdminSol from '../Components/HeaderAdminSol';
import Footer from '../Components/Footer';
import Axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.css';

function CrearCuenta() {
  const [tipoDocumento, setTipoDocumento] = useState("");  
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar usuarios

  // Función para generar contraseña
  const generarContrasenia = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let contraseniaGenerada = "";
    for (let i = 0; i < 8; i++) {
        contraseniaGenerada += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseniaGenerada;
  };

  // Función para registrar vigilante
  const add = async (event) => {
    event.preventDefault(); // Esto evita la recarga de la página

    // Validaciones básicas
    if (!tipoDocumento || !nombres || !apellidos || !numDoc || !telefono || !correo) {
        setMensaje("Por favor complete todos los campos");
        return;
    }

    const nuevaContrasenia = generarContrasenia(); // Generar contraseña aleatoria

    try {
        const response = await Axios.post("http://localhost:3001/crear", {
            tipoDocumento,
            nombres,
            apellidos,
            numDoc,
            telefono,
            correo,
            contrasenia: nuevaContrasenia,
            rol: "Vigilante" // Agregar el rol de Vigilante
        });

        // Mostrar la contraseña generada en el mensaje
        setMensaje(`Vigilante registrado exitosamente. La contraseña generada es: ${nuevaContrasenia}`);
        
        // Limpiar los campos del formulario
        setTipoDocumento("");
        setNombres("");
        setApellidos("");
        setNumDoc("");
        setTelefono("");
        setCorreo("");
    } catch (error) {
        console.error("Error al registrar:", error);
        setMensaje(error.response?.data || "Error al registrar el vigilante");
    }
  };

  // Definición de getUsuario
  const getUsuario = () => {
    Axios.get("http://localhost:3001/usuarios") // Cambia esta URL según tu API
      .then((response) => {
        setUsuarios(response.data); // Almacena los vigilantes en el estado
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };

  // useEffect para llamar a getUsuario al cargar el componente
  useEffect(() => {
    getUsuario();
  }, []);

  return (
    <div>
      <HeaderAdminSol />
      <div className="App">
        <h1 className="apartment-list-title typing-text">Crear una nueva Cuenta</h1>
        <div className="container">
          <div className="left-section">
            <img src={Perfil} alt="Icono Grande" className="icono-grande" style={{ marginTop: '5px' }} />
            <h1>Crear Nueva Cuenta</h1>
            <h2>Aquí puedes Crear la cuenta del funcionario Vigilante</h2>
          </div>
          <div className="outer-container" style={{ padding: '60px', marginTop: '150px', marginLeft: '10px', minHeight: '600px', flexGrow: 1 }}>
            <div className="form-container" style={{ marginTop: 'auto' }}>
              <h2 className="center-title">Crear Nueva Cuenta Funcionario</h2><br />
              <form id="reporte-form" onSubmit={add}>
                <div className="formulario-grid">
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
                      placeholder="Ingresa tus nombres completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="apellidos">
                      <i className="fas fa-user " /> Apellidos:
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={apellidos}
                      onChange={(event) => setApellidos(event.target.value)}
                      required
                      placeholder="Ingresa tus apellidos completos"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipodoc">
                      <i className="fas fa-id-card" /> Tipo Documento:
                    </label>
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
                      <i className="fas fa-id-card" /> Número Documento:
                    </label>
                    <input
                      type="text"
                      id="numdoc"
                      name="numDoc"
                      value={numDoc}
                      onChange={(event) => setNumDoc(event.target.value)}
                      required
                      placeholder="Ingresa tu número de documento"
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
                      placeholder="Ingresa tu número de teléfono"
                    />
                  </div>

                  <div>
                    <label htmlFor="email">
                      <i className="fas fa-envelope" /> Correo electrónico:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="correo"
                      value={correo}
                      onChange={(event) => setCorreo(event.target.value)}
                      required
                      placeholder="ejemplo@correo.com"
                    />
                  </div>
                </div>

                <div className="center-buttons">
                  <button className="ver-mas-button" id="actualizarBtn" type="submit">
                    <i className="fas fa-actualizar" /> Registrar
                  </button>
                </div>
              </form>
              {mensaje && <p className="mensaje">{mensaje}</p>} {/* Mostrar mensaje de éxito o error */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CrearCuenta;