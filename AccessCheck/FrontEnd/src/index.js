import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App'; // Asegúrate de que la ruta sea correcta
import Modal from 'react-modal'; // Asegúrate de que esto esté importado


import "bootstrap/dist/js/bootstrap.bundle";

Modal.setAppElement('#root'); // Este debe coincidir con el ID de tu elemento en index.html

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') 
);