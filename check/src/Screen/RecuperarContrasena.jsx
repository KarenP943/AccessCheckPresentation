import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente de reCAPTCHA
import '../Styles/App3.css';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import '@fortawesome/fontawesome-free/css/all.css';

const RecuperarContrasena = () => {
  const [datosFormulario, setDatosFormulario] = useState({ email: '' });
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del reCAPTCHA
  const [emailError, setEmailError] = useState(''); // Estado para el mensaje de error del correo

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Email:", datosFormulario.email); // Verifica el valor del correo

    // Verifica si el campo de correo está vacío
    if (!datosFormulario.email) {
      setEmailError('El campo de correo no puede estar vacío.');
      return; // Salimos de la función si hay un error
    } else {
      setEmailError(''); // Limpia el mensaje de error si el campo no está vacío
    }

    // Verifica si el reCAPTCHA fue completado
    if (!captchaValue) {
      setMessage('Por favor, completa el reCAPTCHA.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar el correo de recuperación
    // Por ejemplo, llamar a una API para enviar el correo

    setMessage('Se ha enviado un correo de recuperación a ' + datosFormulario.email);
    // Redirigir a la página de inicio de sesión después de un tiempo
    setTimeout(() => {
      navigate('/login'); // Cambia '/login' a la ruta de tu página de inicio de sesión
    }, 3000);
  };

  return (
    <div className="App">
      <Header />
      <h1 className="apartment-list-title typing-text"> Access Check</h1>
      <div className="outer-container" style={{ padding: '60px', marginTop: '80px', marginLeft: '300px', marginRight: '300px', minHeight: '80px' }}>
        <div className="form-container" style={{ width: '500px' }}>
          <h2 className="center-title"> Recuperar Contraseña </h2><br />
          <form onSubmit={handleSubmit}>
            <p>Ingresa tu dirección de <strong>correo electrónico</strong> y <strong>confirma que no eres un robot.</strong></p>
            <p>Te enviaremos un mensaje con tu nombre de usuario y un enlace para restablecer tu contraseña</p><br />
            <div>
              <label htmlFor="email">
                <i className="fas fa-envelope"></i> Ingresa la dirección de tu correo electrónico:
              </label>
              <input
                type="email"
                id="email"
                value={datosFormulario.email}
                onChange={(e) => setDatosFormulario({ ...datosFormulario, email: e.target.value })}
                placeholder="ejemplo@correo.com"
                required
              />
              {/* Mostrar el mensaje de error si existe */}
              {emailError && (
                <small style={{ color: 'red' }}>{emailError}</small>
              )}
            </div>
            <div className="center-buttons">
              <ReCAPTCHA
                sitekey="6LekeGwqAAAAALAQKd7uL3j-DP9Rg9QulmZaJUGj" // Reemplaza con tu clave del sitio
                onChange={(value) => setCaptchaValue(value)} // Almacena el valor del reCAPTCHA
              />
            </div><br />
            <div className="center-buttons" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button className="ver-mas-button" type="submit">
                <i className="fas fa-envelope" /> Enviar al Correo
              </button>
              <button className="ver-mas-button"
                type="button" // Cambia a type="button" para que no envíe el formulario
                onClick={() => navigate('/login')} // Cambia '/login' a la ruta que desees
              >
                <i className="fas fa-arrow-left"></i> Volver
              </button>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecuperarContrasena;