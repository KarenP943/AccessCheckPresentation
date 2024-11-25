// src/Components/Modal.js
import React, {Component} from 'react';
import Modal from 'react-modal'; // Importa Modal de react-modal
import '../Styles/App3.css'; // Importa tu CSS

const modalRoot =document.getElementById('')


/*onst CustomModal = ({ isActive, onClose, agendamiento }) => {
    return (
      <Modal
        isOpen={isActive}
        onRequestClose={onClose}
        contentLabel="Detalles del Apartamento"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <span className="close" onClick={onClose}>×</span>
          {agendamiento && (
            <>
              <h2>Detalles del Apartamento {agendamiento.apartamento} de la TORRE {agendamiento.torre}</h2>
              <ul>
                <li><i className="fas fa-user" /> Nombre Visitante Principal: </li>
                <li><i className="fas fa-phone" /> Teléfono: </li>
                <li><i className="fas fa-parking" /> Parqueadero: </li>
                <li><i className="fas fa-id-card" /> Tipo de Documentos: </li>
                <li><i className="fas fa-id-badge" /> Número de Documento: </li>
                <li><i className="fas fa-tags" /> Cantidad de Visitantes: </li>
                <li><i className="fas fa-calendar-alt" /> Fecha de salida: </li>
                <li><i className="fas fa-clock" /> Hora de Salida: </li>
              </ul>
            </>
          )}
          <button id="activarBtn">Marcar como activa</button>
          <button id="completadaBtn">Marcar como completada</button>
          <button id="pendienteBtn">Pendiente</button>
        </div>
      </Modal>
    );
  };
  export default CustomModal;*/