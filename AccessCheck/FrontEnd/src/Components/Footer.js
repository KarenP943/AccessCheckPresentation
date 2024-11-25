import React from 'react';
import '../Styles/Footer.css';


const Footer = () => {
  const fechaActual = new Date();
  const añoActual = fechaActual.getFullYear();

  return (
    <footer>
      <p>Contáctanos</p>
      <div className="contact-info">
        <p>Cra. 24 #1-193 Sur, Madrid, Cundinamarca</p>
        <p>+57 320 7794583</p>
      </div>
      <p>&copy; @{añoActual} Derechos reservados. Access Check.</p>
    </footer>
  );
};

export default Footer;