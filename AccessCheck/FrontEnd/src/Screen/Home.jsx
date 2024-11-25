import React from 'react';
import '../Styles/pp.css';
import Footer from '../Components/Footer';
import HeaderHome from '../Components/HeaderHome';
import Parqueadero from '../Assets/Img/parqueadero.png';
import '@fortawesome/fontawesome-free/css/all.css';

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <main>
        <div className="inicios-container">
          <div className="container-in">
            <section className="left-img">
              <img src={Parqueadero} alt="Parqueadero" className="rounded-image" />
            </section>
            <section className="right">
              <div className="text-container">
              <h1 className="apartment-list-title typing-text">Bienvenido a Access Check</h1>
                <p>El sistema que facilita el acceso a tu conjunto, asegurando que cada visitante y su vehículo ingresen de manera organizada y segura, con agendamientos previos que cuidan de tu tranquilidad</p>
                {/* Agregar ícono al botón */}
              </div><br></br>
              <a href="/Login" className="inicio-button">
                  <i className="fas fa-sign-in-alt"></i> Iniciar Sesión
                </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;