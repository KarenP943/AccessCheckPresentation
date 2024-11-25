// src/Components/Apartment.js
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Apartment = ({ number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClose = () => setIsModalOpen(false);
  const handleOpen = () => setIsModalOpen(true);

  return (
    <div className="apartment">
      <h3 style={{ color: '#6e3f1d' }}>{number}</h3>
      <ul>
        <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
        <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
        <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
        <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
      </ul>
      <div className="button-container">
        <Button variant="primary" onClick={handleOpen}>
          Ver más 
        </Button>
        <Modal show={isModalOpen} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles Agendamiento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              <li><i className="fas fa-user" style={{ color: '#6e3f1d' }}></i> Nombre Residente:</li>
              <li><i className="fas fa-phone" style={{ color: '#6e3f1d' }}></i> Teléfono:</li>
              <li><i className="fas fa-user-friends" style={{ color: '#6e3f1d' }}></i> Nombre Visitante:</li>
              <li><i className="fas fa-parking" style={{ color: '#6e3f1d' }}></i> Parqueadero: (Si/No)</li>
            </ul>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Apartment;